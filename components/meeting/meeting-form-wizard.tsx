'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

// Create a textarea component
const Textarea = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  );
};

// Generate time slots for a given day (30 min intervals from 9am to 6pm)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 18; hour++) {
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? 'AM' : 'PM';

    slots.push(`${hourFormatted}:00 ${ampm}`);
    if (hour !== 18) {
      // Don't add the :30 slot for 6pm
      slots.push(`${hourFormatted}:30 ${ampm}`);
    }
  }
  return slots;
};

// Meeting form wizard steps
const STEPS = {
  DATE_TIME: 0,
  TOPIC: 1,
  NOTES: 2,
  REVIEW: 3,
  COMPLETED: 4,
};

export function MeetingFormWizard() {
  const [step, setStep] = useState(STEPS.DATE_TIME);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');

  const timeSlots = generateTimeSlots();

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    // In a real app, you would submit the meeting data to your backend here
    console.log({
      date,
      time,
      topic,
      notes,
    });
    const response = await fetch('/api/meeting/create', {
      method: 'POST',
      body: JSON.stringify({ date, time, topic, notes }),
    });
    const data = await response.json();
    console.log(data);

    // Navigate to success page or dashboard
    // For now we'll just show the review step
    setStep(STEPS.COMPLETED);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                {step === STEPS.DATE_TIME && 'Schedule Your Meeting'}
                {step === STEPS.TOPIC && "What's the Meeting About?"}
                {step === STEPS.NOTES && 'Add Meeting Notes'}
                {step === STEPS.REVIEW && 'Review Meeting Details'}
                {step === STEPS.COMPLETED && 'Meeting Scheduled'}
              </CardTitle>
              <CardDescription>
                {step === STEPS.DATE_TIME && 'Select a date and time for your meeting'}
                {step === STEPS.TOPIC && 'Enter the main topic or focus of this meeting'}
                {step === STEPS.NOTES && 'Add any additional context or notes for attendees'}
                {step === STEPS.REVIEW && 'Review the details before confirming'}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {step === STEPS.DATE_TIME && (
                <div className="space-y-6">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="w-full sm:w-1/2">
                      <Label className="mb-2 block">Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border w-full"
                        disabled={(date) => date < new Date()}
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <Label className="mb-2 block">Select Time</Label>
                      <Select onValueChange={setTime} value={time}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {step === STEPS.TOPIC && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="topic" className="mb-2 block">
                      Meeting Topic
                    </Label>
                    <Input
                      id="topic"
                      value={topic}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTopic(e.target.value)
                      }
                      placeholder="E.g., Project kickoff, Weekly sync, Design review"
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {step === STEPS.NOTES && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes" className="mb-2 block">
                      Meeting Notes & Context
                    </Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setNotes(e.target.value)
                      }
                      placeholder="Add any additional details, agenda items, or context for the meeting..."
                      className="min-h-[150px] w-full"
                    />
                  </div>
                </div>
              )}

              {step === STEPS.REVIEW && (
                <div className="space-y-6">
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="mb-2 font-medium">Meeting Details</h3>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="col-span-2">
                          {date ? format(date, 'PPP') : 'No date selected'}
                        </span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="col-span-2">{time || 'No time selected'}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-muted-foreground">Topic:</span>
                        <span className="col-span-2">{topic || 'No topic provided'}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-muted-foreground">Notes:</span>
                        <span className="col-span-2 whitespace-pre-wrap">
                          {notes || 'No notes provided'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === STEPS.COMPLETED && (
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-medium">Meeting Scheduled</h3>
                    <p>Your meeting has been successfully scheduled!</p>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack} disabled={step === STEPS.DATE_TIME}>
                Back
              </Button>

              {step < STEPS.REVIEW ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (step === STEPS.DATE_TIME && (!date || !time)) ||
                    (step === STEPS.TOPIC && !topic)
                  }
                >
                  Continue
                </Button>
              ) : (
                <Button onClick={handleSubmit}>Schedule Meeting</Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-center">
        <nav className="flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <Button
              key={i}
              variant={step === i ? 'default' : 'outline'}
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => {
                // Only allow going back to previous steps, not skipping ahead
                if (i < step) {
                  setStep(i);
                }
              }}
            >
              {i + 1}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}
