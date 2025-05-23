'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { encodePassphrase, generateRoomId, randomString } from '@/lib/client-utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

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
    <>
      <header className="fixed top-0 left-0 w-full z-20 bg-secondary shadow-md">
        <nav className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            href="/"
            className="text-foreground text-2xl font-bold hover:text-accent-foreground transition-colors"
          >
            Teach Teach
          </Link>
          <ul className="flex flex-wrap gap-4 text-accent-foreground">
            <li>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href={`/rooms/${generateRoomId()}`}
                className="hover:text-foreground transition-colors"
              >
                Room
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="bg-foreground min-h-screen pt-20 overflow-x-hidden">
        <div className="relative h-[70vh] w-full">
          <Image
            className="absolute inset-0 w-full h-full object-cover"
            src="/images/tt-header.avif"
            alt="girl looking at the computer on video call"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12">
              <div className="flex flex-col gap-4 max-w-3xl">
                <h1 className="text-background text-4xl md:text-6xl font-bold text-balance">
                  Supporting you while you support your students.
                </h1>
                <p className="text-background text-lg md:text-xl text-balance">
                  Connect, collaborate, and grow with other educators.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="w-full py-12 md:py-16 px-4 md:px-12 bg-secondary">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Teach Together Mission
            </h2>
            <p className="text-accent-foreground text-base md:text-lg leading-relaxed">
              At Teach Together, we believe in empowering educators through seamless collaboration.
              Our mission is to create a supportive environment where teachers can connect, share
              resources, and learn from each other, ultimately enhancing the educational experience
              for students worldwide. Through our platform, we&apos;re building bridges between
              classrooms and making quality education more accessible for all.
            </p>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 px-4 md:px-12 bg-primary">
          <div className="container mx-auto max-w-4xl flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-background mb-4 text-center">
              Stay Connected
            </h2>
            <p className="text-background text-base md:text-lg leading-relaxed text-center mb-6 max-w-2xl">
              Sign up for our monthly newsletter to receive teaching tips, collaboration
              opportunities, and updates on new features to enhance your teaching experience.
            </p>
            <form className="w-full max-w-md flex flex-col gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-background"
                  required
                />
              </div>
              <Button type="submit" className="w-full" variant="secondary">
                Subscribe to Newsletter
              </Button>
            </form>
          </div>
        </section>
      </main>
      <footer className="bg-secondary py-6 text-center text-accent-foreground">
        <div className="container mx-auto px-4">
          Hosted on{' '}
          <a
            href="https://livekit.io/cloud?ref=meet"
            className="text-primary hover:underline"
            rel="noopener"
          >
            LiveKit Cloud
          </a>
          . Source code on{' '}
          <a
            href="https://github.com/livekit/meet?ref=meet"
            className="text-primary hover:underline"
            rel="noopener"
          >
            GitHub
          </a>
          .
        </div>
      </footer>
    </>
  );
}
