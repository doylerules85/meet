import EditForm from '@/components/meeting/edit-form';
import { createClient } from '@/lib/supabase/server';

const EditMeetingPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const supabase = await createClient();
  const { data: meeting, error } = await supabase
    .from('meetings')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section>
      <EditForm meeting={meeting} />
    </section>
  );
};

export default EditMeetingPage;
