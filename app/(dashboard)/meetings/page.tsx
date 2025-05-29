import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import dayjs from 'dayjs';
import Link from 'next/link';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default async function MeetingsPage() {
  const supabase = await createClient();
  const { data: meetings } = await supabase.from('meetings').select('*');

  return (
    <>
      <h1 className="text-2xl font-bold">Meetings</h1>
      {meetings && meetings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="border rounded-md p-4">
              <p>{meeting.topic}</p>
              <p>{meeting.notes}</p>
              <p>{dayjs(meeting.scheduled_date).format()}</p>
              <p>
                {dayjs(meeting.scheduled_date)
                  .tz(meeting.timezone_meeting)
                  .format('MMM D, YYYY hh:mm A')}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold">No meetings found</h2>
          <p className="text-sm text-muted-foreground">
            You don&apos;t have any meetings scheduled yet.
          </p>
          <Button asChild>
            <Link href="/meetings/new">Create a new meeting</Link>
          </Button>
        </div>
      )}
    </>
  );
}
