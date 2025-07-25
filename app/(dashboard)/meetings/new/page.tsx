import { MeetingFormWizard } from '@/components/meeting/meeting-form-wizard';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export const metadata = {
  title: 'Schedule a New Meeting',
  description: 'Create a new meeting and provide details for the attendees',
};

export default function NewMeetingPage() {
  return (
    <div className="container mx-auto py-10">
      <MeetingFormWizard />
    </div>
  );
}
