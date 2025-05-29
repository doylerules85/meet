import { createClient } from '@/lib/supabase/server';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  const timestamp = dayjs(body.date + ' ' + body.time)
    .utc()
    .format();

  const { data, error } = await supabase
    .from('meetings')
    .insert({
      topic: body.topic,
      notes: body.notes,
      scheduled_date: timestamp,
      created_by: user.user?.id,
      timezone_meeting: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
