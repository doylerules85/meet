'use client';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useState } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

const EditForm = ({ meeting }: { meeting: any }) => {
  const [date, setDate] = useState(meeting.scheduled_date);
  const handleCancelMeeting = () => {
    console.log('cancel meeting');
  };
  return (
    <div>
      <div className="w-full flex items-center justify-between relative">
        <div>
          <h1 className="text-3xl font-bold">{meeting.topic}</h1>
          {meeting.description ? (
            <p className="text-sm text-muted-foreground">{meeting.description}</p>
          ) : (
            <p className="text-sm text-muted-foreground italic">No description</p>
          )}
        </div>
        <Button className="absolute right-0">Save Changes</Button>
      </div>
      <p className="text-sm text-muted-foreground">{meeting.scheduled_date}</p>
      <Popover>
        <PopoverTrigger className="flex items-center gap-2">
          <span className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span>
              {date
                ? dayjs(date).tz(meeting.timezone_meeting).format('MMM D, YYYY')
                : dayjs(meeting.scheduled_date).tz(meeting.timezone_meeting).format('MMM D, YYYY')}
            </span>
          </span>
          <ChevronDownIcon className="w-4 h-4" />
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={new Date(date)}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
            }}
          />
        </PopoverContent>
      </Popover>
      <p className="text-sm text-muted-foreground">{meeting.time}</p>
      <div className="">
        <hr className="my-2" />
        <h2 className="text-xl text-muted-foreground">DANGER ZONE</h2>
        <Button variant="destructive" className="" onClick={handleCancelMeeting}>
          Cancel Meeting
        </Button>
      </div>
    </div>
  );
};

export default EditForm;
