import { Payload } from "payload";
import { Availability } from "../payload-types";

export interface AvailabilityEntry {
    id: string;
    title: string;
    availabilityType: "single_day" | "date_range" | "recurring_weekly";
    startDate: string;
    endDate?: string;
    daysOfWeek?: string[];
    timeBlocks: {
        startTime: string;
        endTime: string;
        description?: string;
    }[];
    isUnavailable: boolean;
    isActive: boolean;
    notes?: string;
    timezone: string;
}

export interface TimeBlock {
    startTime: string;
    endTime: string;
    description?: string;
}

export interface AvailabilityCheckResult {
    isAvailable: boolean;
    conflictingEntries?: AvailabilityEntry[];
    reason?: string;
}

/**
 * Convert time string (HH:MM) to minutes from midnight
 */
export const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

/**
 * Convert minutes from midnight to time string (HH:MM)
 */
export const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${
        mins.toString().padStart(2, "0")
    }`;
};

/**
 * Check if a time block overlaps with another time block
 */
export const timeBlocksOverlap = (
    block1: TimeBlock,
    block2: TimeBlock,
): boolean => {
    const start1 = timeToMinutes(block1.startTime);
    const end1 = timeToMinutes(block1.endTime);
    const start2 = timeToMinutes(block2.startTime);
    const end2 = timeToMinutes(block2.endTime);

    return start1 < end2 && start2 < end1;
};

/**
 * Check if a given date/time is available based on availability entries
 */
export const checkAvailability = (
    checkDate: Date,
    checkTime: string,
    duration: number, // in minutes
    availabilityEntries: AvailabilityEntry[],
): AvailabilityCheckResult => {
    const checkDateStr = checkDate.toISOString().split("T")[0];
    const dayOfWeek = checkDate.toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();
    const endTime = minutesToTime(timeToMinutes(checkTime) + duration);

    const requestedBlock: TimeBlock = {
        startTime: checkTime,
        endTime: endTime,
    };

    const conflictingEntries: AvailabilityEntry[] = [];

    for (const entry of availabilityEntries) {
        if (!entry.isActive) continue;

        let dateMatches = false;

        // Check date matching based on availability type
        switch (entry.availabilityType) {
            case "single_day":
                dateMatches = entry.startDate === checkDateStr;
                break;
            case "date_range":
                if (entry.endDate) {
                    dateMatches = checkDateStr >= entry.startDate &&
                        checkDateStr <= entry.endDate;
                }
                break;
            case "recurring_weekly":
                dateMatches = entry.daysOfWeek?.includes(dayOfWeek) || false;
                break;
        }

        if (!dateMatches) continue;

        // Check time block conflicts
        for (const timeBlock of entry.timeBlocks) {
            if (timeBlocksOverlap(requestedBlock, timeBlock)) {
                if (entry.isUnavailable) {
                    conflictingEntries.push(entry);
                }
            }
        }
    }

    return {
        isAvailable: conflictingEntries.length === 0,
        conflictingEntries: conflictingEntries.length > 0
            ? conflictingEntries
            : undefined,
        reason: conflictingEntries.length > 0
            ? "Time slot conflicts with unavailable periods"
            : undefined,
    };
};

/**
 * Get all availability entries for a specific date range
 */
export const getAvailabilityForDateRange = async (
    payload: Payload,
    startDate: string,
    endDate: string,
): Promise<AvailabilityEntry[]> => {
    const { docs } = await payload.find({
        collection: "availability",
        where: {
            and: [
                { isActive: { equals: true } },
                {
                    or: [
                        // Single day entries within range
                        {
                            and: [
                                { availabilityType: { equals: "single_day" } },
                                {
                                    startDate: {
                                        greater_than_equal: startDate,
                                    },
                                },
                                { startDate: { less_than_equal: endDate } },
                            ],
                        },
                        // Date range entries that overlap with our range
                        {
                            and: [
                                { availabilityType: { equals: "date_range" } },
                                { startDate: { less_than_equal: endDate } },
                                { endDate: { greater_than_equal: startDate } },
                            ],
                        },
                        // Recurring weekly entries (always included if active)
                        {
                            availabilityType: { equals: "recurring_weekly" },
                        },
                    ],
                },
            ],
        },
        limit: 1000,
    });

    // Convert Availability[] to AvailabilityEntry[] by mapping the id from number to string
    return docs.map((doc: Availability) => ({
        ...doc,
        id: doc.id.toString(),
    })) as AvailabilityEntry[];
};

/**
 * Get available time slots for a specific date
 */
export const getAvailableTimeSlots = async (
    payload: Payload,
    date: Date,
    slotDuration: number = 60, // minutes
    workingHours: { start: string; end: string } = {
        start: "09:00",
        end: "17:00",
    },
): Promise<TimeBlock[]> => {
    const dateStr = date.toISOString().split("T")[0];
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split("T")[0];

    const availabilityEntries = await getAvailabilityForDateRange(
        payload,
        dateStr,
        nextDayStr,
    );

    const startMinutes = timeToMinutes(workingHours.start);
    const endMinutes = timeToMinutes(workingHours.end);
    const availableSlots: TimeBlock[] = [];

    // Generate all possible time slots within working hours
    for (
        let current = startMinutes;
        current + slotDuration <= endMinutes;
        current += slotDuration
    ) {
        const startTime = minutesToTime(current);
        const endTime = minutesToTime(current + slotDuration);

        const slot: TimeBlock = { startTime, endTime };

        // Check if this slot is available
        const availability = checkAvailability(
            date,
            startTime,
            slotDuration,
            availabilityEntries,
        );

        if (availability.isAvailable) {
            availableSlots.push(slot);
        }
    }

    return availableSlots;
};

/**
 * Create a formatted summary of availability entries
 */
export const formatAvailabilitySummary = (entry: AvailabilityEntry): string => {
    const prefix = entry.isUnavailable ? "Unavailable" : "Available";
    const timeBlocks = entry.timeBlocks
        .map((block) => `${block.startTime}-${block.endTime}`)
        .join(", ");

    let dateInfo = "";
    switch (entry.availabilityType) {
        case "single_day":
            dateInfo = `on ${entry.startDate}`;
            break;
        case "date_range":
            dateInfo = `from ${entry.startDate} to ${entry.endDate}`;
            break;
        case "recurring_weekly":
            dateInfo = `on ${entry.daysOfWeek?.join(", ")} (weekly)`;
            break;
    }

    return `${prefix} ${dateInfo} during ${timeBlocks}`;
};

/**
 * Validate that a new availability entry doesn't conflict with existing ones
 */
export const validateAvailabilityEntry = (
    newEntry: Omit<AvailabilityEntry, "id">,
    existingEntries: AvailabilityEntry[],
): { isValid: boolean; conflicts: string[] } => {
    const conflicts: string[] = [];

    // Check for time block conflicts within the same entry
    for (let i = 0; i < newEntry.timeBlocks.length; i++) {
        for (let j = i + 1; j < newEntry.timeBlocks.length; j++) {
            if (
                timeBlocksOverlap(
                    newEntry.timeBlocks[i],
                    newEntry.timeBlocks[j],
                )
            ) {
                conflicts.push(
                    `Time blocks ${i + 1} and ${
                        j + 1
                    } overlap within the same entry`,
                );
            }
        }
    }

    // Additional validation could be added here for conflicts with existing entries

    return {
        isValid: conflicts.length === 0,
        conflicts,
    };
};

export default {
    timeToMinutes,
    minutesToTime,
    timeBlocksOverlap,
    checkAvailability,
    getAvailabilityForDateRange,
    getAvailableTimeSlots,
    formatAvailabilitySummary,
    validateAvailabilityEntry,
};
