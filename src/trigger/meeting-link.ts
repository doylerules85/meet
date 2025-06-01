import { generateRoomId } from '@/lib/client-utils';
import { createClient } from '@supabase/supabase-js';
import { logger, schedules } from '@trigger.dev/sdk/v3';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const meetingLink = schedules.task({
  id: 'meeting-link',
  cron: '0 0/30 * * *',
  run: async (payload: any, { ctx }) => {
    logger.log('scheduling meeting link', { payload, ctx });
    
    // Using ISO string format for reliable timezone handling
    const currentTimestamp = new Date().toISOString();
    
    const { data: meetings, error } = await supabase
      .from('meetings')
      .select('*')
      .lt('scheduled_date', currentTimestamp);

    if (error) {
      logger.error('error fetching meetings', { error });
      return {
        message: 'error fetching meetings',
      };
    }

    if (!meetings) {
      return {
        message: 'no meetings found',
      };
    }

    for (const meeting of meetings) {
      const roomId = generateRoomId();
      const meetingLink = `http://localhost:3000/rooms/${roomId}`;
      const { error } = await supabase
        .from('meetings')
        .update({ meeting_link: meetingLink })
        .eq('id', meeting.id);

      if (error) {
        logger.error('error updating meeting link', { error });
      }
    }

    return {
      message: 'meeting link created',
    };
  },
});
