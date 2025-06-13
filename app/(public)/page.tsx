'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { encodePassphrase, generateRoomId, randomString } from '@/lib/client-utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { motion, useAnimate } from 'framer-motion';
import List from '@/components/home/List';
import { Check, CheckCircle, CheckCircle2 } from 'lucide-react';

function Tabs(props: React.PropsWithChildren<{}>) {
  const searchParams = useSearchParams();
  const tabIndex = searchParams?.get('tab') === 'custom' ? 1 : 0;

  const router = useRouter();
  function onTabSelected(index: number) {
    const tab = index === 1 ? 'custom' : 'demo';
    router.push(`/?tab=${tab}`);
  }

  let tabs = React.Children.map(props.children, (child, index) => {
    return (
      <button
        className="px-4 py-2 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground"
        onClick={() => {
          if (onTabSelected) {
            onTabSelected(index);
          }
        }}
        aria-pressed={tabIndex === index}
      >
        {/* @ts-ignore */}
        {child?.props.label}
      </button>
    );
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex gap-2 mb-4">{tabs}</div>
      {/* @ts-ignore */}
      {props.children[tabIndex]}
    </div>
  );
}

function DemoMeetingTab(props: { label: string }) {
  const router = useRouter();
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));
  const startMeeting = () => {
    if (e2ee) {
      router.push(`/rooms/${generateRoomId()}#${encodePassphrase(sharedPassphrase)}`);
    } else {
      router.push(`/rooms/${generateRoomId()}`);
    }
  };
  return (
    <div className="tab-content">
      <p style={{ margin: 0 }}>Try LiveKit Meet for free with our live demo project.</p>
      <Button style={{ marginTop: '1rem' }} onClick={startMeeting}>
        Start Meeting
      </Button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <input
            id="use-e2ee"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
          ></input>
          <label htmlFor="use-e2ee">Enable end-to-end encryption</label>
        </div>
        {e2ee && (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <label htmlFor="passphrase">Passphrase</label>
            <input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function CustomConnectionTab(props: { label: string }) {
  const router = useRouter();

  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));

  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5 });
  }, [scope]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const serverUrl = formData.get('serverUrl');
    const token = formData.get('token');
    if (e2ee) {
      router.push(
        `/custom/?liveKitUrl=${serverUrl}&token=${token}#${encodePassphrase(sharedPassphrase)}`,
      );
    } else {
      router.push(`/custom/?liveKitUrl=${serverUrl}&token=${token}`);
    }
  };
  return (
    <form className="tab-content" onSubmit={onSubmit}>
      <p style={{ marginTop: 0 }}>
        Connect LiveKit Meet with a custom server using LiveKit Cloud or LiveKit Server.
      </p>
      <input
        id="serverUrl"
        name="serverUrl"
        type="url"
        placeholder="LiveKit Server URL: wss://*.livekit.cloud"
        required
      />
      <textarea
        id="token"
        name="token"
        placeholder="Token"
        required
        rows={5}
        style={{ padding: '1px 2px', fontSize: 'inherit', lineHeight: 'inherit' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <input
            id="use-e2ee"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
          ></input>
          <label htmlFor="use-e2ee">Enable end-to-end encryption</label>
        </div>
        {e2ee && (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <label htmlFor="passphrase">Passphrase</label>
            <input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
            />
          </div>
        )}
      </div>

      <hr
        style={{ width: '100%', borderColor: 'rgba(255, 255, 255, 0.15)', marginBlock: '1rem' }}
      />
      <button
        style={{ paddingInline: '1.25rem', width: '100%' }}
        className="lk-button"
        type="submit"
      >
        Connect
      </button>
    </form>
  );
}

export default function Page() {
  return (
    <main className="w-full">
      <div className="relative w-full flex flex-col-reverse lg:grid grid-cols-12 gap-8 items-center py-10 sm:py-16 md:py-24">
        <div className="col-span-6 w-full px-4 md:px-8">
          <div className="flex flex-col gap-4 lg:gap-8 max-w-3xl">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'ease' }}
              className="text-foreground text-2xl md:text-4xl lg:text-5xl text-balance leading-tight uppercase"
            >
              Supporting you while you support your students.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'ease', delay: 0.25 }}
              className="text-foreground text-base md:text-lg lg:text-xl text-balance"
            >
              Get on-demand access to a live video call with a teacher to help you answer your
              questions, get feedback on your teaching, or just chat about your teaching journey.
            </motion.p>
            <Link href="/auth/sign-up" className="w-fit header-btn mt-5" passHref>
              <Button variant="default" size="xl" className="bg-primary text-primary-foreground">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-span-6 w-full px-4 md:px-8 grid grid-cols-2 gap-4 grid-rows-2 md:py-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.2, position: 'absolute' }}
            animate={{ opacity: 1, scale: 1, position: 'relative' }}
            transition={{ ease: 'ease', type: 'spring', bounce: 0.25 }}
            className="size-full"
          >
            <Image
              src="/images/videocall-two.png"
              alt="Video call demonstration"
              className="rounded-lg"
              width={600}
              height={600}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.2, position: 'absolute' }}
            animate={{ opacity: 1, scale: 1, position: 'relative' }}
            transition={{ ease: 'ease', type: 'spring', bounce: 0.25, delay: 0.25 }}
            className="size-full rounded-lg relative col-span-1 row-span-1 -col-start-2 row-start-2"
          >
            <Image
              src="/images/videocall-one.png"
              alt="girl looking at the computer on video call"
              className="rounded-lg"
              width={600}
              height={600}
            />
          </motion.div>
          <div className="size-full col-start-2 place-content-center">
            <List>
              <li className="opacity-0 flex items-center gap-2">
                <Check className="size-4 lg:size-6 bg-light-green rounded-full p-1" />
                <p className="text-foreground text-xs lg:text-base">
                  Get trusted feedback in a safe space.
                </p>
              </li>
              <li className="opacity-0 flex items-center gap-2">
                <Check className="size-4 lg:size-6 bg-light-green rounded-full p-1" />
                <p className="text-foreground text-xs lg:text-base">
                  Get answers to all things classroom.
                </p>
              </li>
              <li className="opacity-0 flex items-center gap-2">
                <Check className="size-4 lg:size-6 bg-light-green rounded-full p-1" />
                <p className="text-foreground text-xs lg:text-base">Review course material.</p>
              </li>
            </List>
          </div>
          <div className="size-full col-start-1 row-start-2 place-content-center">
            <List delay={3}>
              <li className="opacity-0 flex items-center gap-2">
                <Check className="size-4 lg:size-6 bg-light-green rounded-full p-1" />
                <p className="text-foreground text-xs lg:text-base">Conduct Meetings Online.</p>
              </li>
              <li className="opacity-0 flex items-center gap-2">
                <Check className="size-4 lg:size-6 bg-light-green rounded-full p-1" />
                <p className="text-foreground text-xs lg:text-base">
                  Get Teacher Self-Improvement hours.
                </p>
              </li>
              <li className="opacity-0 flex items-center gap-2">
                <Check className="size-4 lg:size-6 bg-light-green rounded-full p-1" />
                <p className="text-foreground text-xs lg:text-base">Access to premium resources.</p>
              </li>
            </List>
          </div>
        </div>
      </div>

      <section className="w-full py-12 md:py-16 px-4 md:px-12 bg-background">
        <div className="mx-auto w-full items-center grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <Image
              className="rounded-lg w-full h-auto"
              src="/images/tt-header.avif"
              alt="Teach Together Mission"
              width={700}
              height={500}
            />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-6">
            <h2 className="text-3xl md:text-5xl text-foreground uppercase">Our Mission</h2>
            <p className="text-accent-foreground text-base md:text-lg leading-relaxed mb-5">
              At Teach Teach, we believe in empowering educators through seamless collaboration. Our
              mission is to create a supportive environment where teachers can connect, share
              resources, and learn from each other, ultimately enhancing the educational experience
              for students worldwide. Through our platform, we&apos;re building bridges between
              classrooms and making quality education more accessible for all.
            </p>
            <Link href="/about" className="w-fit" passHref>
              <Button
                variant="default"
                size="lg"
                className="bg-light-blue text-foreground uppercase tracking-wider border border-foreground"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/*pricing section*/}
      <section className="w-full py-12 md:py-20 px-4 md:px-12 bg-card">
        <div className="flex flex-col justify-center items-center lg:grid lg:grid-cols-[1fr_2fr_1fr] gap-8 lg:gap-4">
          <ul className="hidden lg:flex flex-col gap-4 items-center justify-center">
            <li className="px-2 py-1 rounded-lg w-fit border-2 border-light-blue">
              <p className="text-base text-sky-500">30 minutes video calls.</p>
            </li>
            <li className="px-2 py-1 rounded-lg w-fit border-2 border-light-blue">
              <p className="text-base text-sky-500">Access to premium resources.</p>
            </li>
            <li className="px-2 py-1 rounded-lg w-fit border-2 border-light-blue">
              <p className="text-base text-sky-500">Personalized meeting notes.</p>
            </li>
          </ul>
          <div className="col-start-2">
            <div className="container mx-auto max-w-4xl flex flex-col items-center">
              <h2 className="text-3xl text-foreground mb-4 text-center uppercase tracking-wider">
                Become a Pro Member
              </h2>
              <p className="text-accent-foreground text-base md:text-lg leading-relaxed mb-4">
                Join our community of educators and unlock exclusive benefits.
              </p>
              <span className="text-accent-foreground text-2xl md:text-5xl font-bold">
                $25{' '}
                <span className="text-accent-foreground text-base md:text-lg uppercase">
                  /month
                </span>
              </span>
            </div>
            <div className="grid grid-cols-[1fr_1fr] grid-rows-[200px] items-center justify-center gap-4 h-auto py-8 max-w-xl mx-auto">
              <div className="relative size-full">
                <Image
                  src="/images/videocall-three.png"
                  alt="girl looking at the computer on video call"
                  className="rounded-lg object-cover aspect-video"
                  sizes="(min-width: 808px) 50vw, 100vw"
                  fill={true}
                />
              </div>
              <div className="relative size-full">
                <Image
                  src="/images/videocall-five.jpeg"
                  alt="girl looking at the computer on video call"
                  className="rounded-lg object-cover aspect-video"
                  sizes="(min-width: 808px) 50vw, 100vw"
                  fill={true}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/auth/sign-up" className="w-fit" passHref>
                <Button
                  variant="default"
                  size="lg"
                  className="bg-light-green text-foreground uppercase tracking-wider border border-foreground"
                >
                  Purchase Membership Today
                </Button>
              </Link>
            </div>
          </div>
          <ul className="hidden lg:flex flex-col gap-4 items-center justify-center">
            <li className="border-2 border-light-blue px-2 py-1 rounded-lg w-fit">
              <p className="text-base text-sky-500">Check-in Calls.</p>
            </li>
            <li className="border-2 border-light-blue px-2 py-1 rounded-lg w-fit">
              <p className="text-base text-sky-500">Personalized meeting notes.</p>
            </li>
            <li className="border-2 border-light-blue px-2 py-1 rounded-lg w-fit">
              <p className="text-base text-sky-500">Next Steps Materials.</p>
            </li>
          </ul>
          <div className="flex lg:hidden flex-col gap-4 items-center justify-center">
            <h3 className="text-2xl text-foreground uppercase tracking-wider">
              Benefits of Membership
            </h3>
            <ul className="text-center flex flex-col gap-2 items-center justify-center">
              <li className="px-2 py-1 rounded-lg w-fit border-2 border-light-blue">
                <p className="text-base text-sky-500">Check-in Calls.</p>
              </li>
              <li className="px-2 py-1 rounded-lg w-fit border-2 border-light-blue">
                <p className="text-base text-sky-500">Personalized meeting notes.</p>
              </li>
              <li className="px-2 py-1 rounded-lg w-fit border-2 border-light-blue">
                <p className="text-base text-sky-500">Next Steps Materials.</p>
              </li>
              <li className="px-2 py-1 rounded-lg w-fit border-2 border-light-blue">
                <p className="text-base text-sky-500">30 minutes video calls.</p>
              </li>
              <li className="px-2 py-1 rounded-lg w-fit border-2 border-light-blue">
                <p className="text-base text-sky-500">Access to premium resources.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 px-4 md:px-12 bg-primary-foreground">
        <div className="container mx-auto max-w-4xl flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl text-accent mb-4 text-center uppercase tracking-wider">
            Stay Connected
          </h2>
          <p className="text-accent text-base md:text-lg leading-relaxed text-center mb-6 max-w-2xl">
            Sign up for our monthly newsletter to receive teaching tips, collaboration
            opportunities, and updates on new features to enhance your teaching experience.
          </p>
          <form className="w-full max-w-md flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-1.5">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-background flex-1 w-full"
                required
              />
              <Button type="submit" variant="default" size="lg" className="hover:bg-background">
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
