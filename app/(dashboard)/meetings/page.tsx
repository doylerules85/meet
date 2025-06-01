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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="border rounded-md py-6 px-4 flex flex-col gap-4">
              <h2 className="text-2xl font-medium">{meeting.topic}</h2>
              <p>
                {dayjs(meeting.scheduled_date)
                  .tz(meeting.timezone_meeting)
                  .format('MMM D, YYYY hh:mm A')}
              </p>
              {meeting.meeting_link && (
                <p>
                  <Link
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm"
                    href={meeting.meeting_link}
                    target="_blank"
                  >
                    Join Meeting now!
                  </Link>
                </p>
              )}
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
