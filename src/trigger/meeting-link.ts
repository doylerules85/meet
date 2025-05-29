import { logger, schedules } from '@trigger.dev/sdk/v3';

export const meetingLink = schedules.task({
  id: 'meeting-link',
  cron: '0 0/5 * * *',
  run: async (payload: any, { ctx }) => {
    logger.log('scheduling meeting link', { payload, ctx });

    return {
      message: 'meeting link created',
    };
  },
});
