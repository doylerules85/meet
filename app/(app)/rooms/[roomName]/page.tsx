import { Suspense } from 'react';
import { PageClientImpl } from './PageClientImpl';
import { isVideoCodec } from '@/lib/types';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Loading from './loading';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ roomName: string }>;
  searchParams: Promise<{
    // FIXME: We should not allow values for regions if in playground mode.
    region?: string;
    hq?: string;
    codec?: string;
  }>;
}) {
  // need to fetch the room name from the database and add it here. and make sure one exists.
  // if there is no room name or it expired we need to show room expired page.
  const _params = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .eq('meeting_link', _params.roomName);

  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col size-full min-h-screen items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl lg:text-4xl uppercase">Room not found.</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            The room you are looking for does not exist.
          </p>
        </div>

        <Button asChild>
          <Link href="/">Go back to home</Link>
        </Button>
      </div>
    );
  }

  const _searchParams = await searchParams;
  const codec =
    typeof _searchParams.codec === 'string' && isVideoCodec(_searchParams.codec)
      ? _searchParams.codec
      : 'vp9';
  const hq = _searchParams.hq === 'true' ? true : false;

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid content-center min-h-screen items-center justify-center">
        <h1 className="text-2xl text-center">Join Your Meeting</h1>
        <PageClientImpl
          roomName={_params.roomName}
          region={_searchParams.region}
          hq={hq}
          codec={codec}
        />
      </div>
    </Suspense>
  );
}
