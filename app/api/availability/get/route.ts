import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";

export async function GET(request: NextRequest) {
    try {
        const payload = await getPayload({ config });
        const { searchParams } = new URL(request.url);

        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        // Default to next 3 months if no date range provided
        const defaultStart = new Date().toISOString().split("T")[0];
        const defaultEnd =
            new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split(
                "T",
            )[0];

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
                                    {
                                        availabilityType: {
                                            equals: "single_day",
                                        },
                                    },
                                    {
                                        startDate: {
                                            greater_than_equal: startDate ||
                                                defaultStart,
                                        },
                                    },
                                    {
                                        startDate: {
                                            less_than_equal: endDate ||
                                                defaultEnd,
                                        },
                                    },
                                ],
                            },
                            // Date range entries that overlap with our range
                            {
                                and: [
                                    {
                                        availabilityType: {
                                            equals: "date_range",
                                        },
                                    },
                                    {
                                        startDate: {
                                            less_than_equal: endDate ||
                                                defaultEnd,
                                        },
                                    },
                                    {
                                        endDate: {
                                            greater_than_equal: startDate ||
                                                defaultStart,
                                        },
                                    },
                                ],
                            },
                            // Recurring weekly entries (always included if active)
                            {
                                availabilityType: {
                                    equals: "recurring_weekly",
                                },
                            },
                        ],
                    },
                ],
            },
            limit: 1000,
        });

        return NextResponse.json({
            success: true,
            availability: docs,
        });
    } catch (error) {
        console.error("Error fetching availability:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch availability" },
            { status: 500 },
        );
    }
}
