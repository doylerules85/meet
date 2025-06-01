'use client';

import { formatChatMessageLinks, RoomContext, VideoConference } from '@livekit/components-react';
import {
  ExternalE2EEKeyProvider,
  LogLevel,
  Room,
  RoomConnectOptions,
  RoomOptions,
  VideoPresets,
  type VideoCodec,
} from 'livekit-client';
import { DebugMode } from '@/lib/Debug';
import { useEffect, useMemo } from 'react';
import { decodePassphrase } from '@/lib/client-utils';
import { KeyboardShortcuts } from '@/lib/KeyboardShortcuts';
import { SettingsMenu } from '@/lib/SettingsMenu';

export function VideoConferenceClientImpl(props: {
  liveKitUrl: string;
  token: string;
  codec: VideoCodec | undefined;
}) {
  const worker = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new Worker(new URL('livekit-client/e2ee-worker', import.meta.url))
        : null,
    [],
  );

  const keyProvider = useMemo(() => new ExternalE2EEKeyProvider(), []);

  const e2eePassphrase = useMemo(
    () =>
      typeof window !== 'undefined'
        ? decodePassphrase(window.location.hash.substring(1))
        : undefined,
    [],
  );

  const e2eeEnabled = !!(e2eePassphrase && worker);

  const roomOptions = useMemo((): RoomOptions => {
    return {
      publishDefaults: {
        videoSimulcastLayers: [VideoPresets.h540, VideoPresets.h216],
        red: !e2eeEnabled,
        videoCodec: props.codec,
      },
      adaptiveStream: { pixelDensity: 'screen' },
      dynacast: true,
      e2ee: e2eeEnabled
        ? {
            keyProvider,
            worker,
          }
        : undefined,
    };
  }, [e2eeEnabled, keyProvider, worker, props.codec]);

  const room = useMemo(() => new Room(roomOptions), [roomOptions]);
  useEffect(() => {
    if (e2eeEnabled) {
      keyProvider.setKey(e2eePassphrase);
      room.setE2EEEnabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [e2eeEnabled, keyProvider, e2eePassphrase, room]);
  const connectOptions = useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true,
    };
  }, []);
  useEffect(() => {
    room.connect(props.liveKitUrl, props.token, connectOptions).catch((error) => {
      console.error(error);
    });
    room.localParticipant.enableCameraAndMicrophone().catch((error) => {
      console.error(error);
    });
  }, [room, props.liveKitUrl, props.token, connectOptions]);

  return (
    <div className="lk-room-container">
      <RoomContext.Provider value={room}>
        <KeyboardShortcuts />
        <VideoConference
          chatMessageFormatter={formatChatMessageLinks}
          SettingsComponent={
            process.env.NEXT_PUBLIC_SHOW_SETTINGS_MENU === 'true' ? SettingsMenu : undefined
          }
        />
        <DebugMode logLevel={LogLevel.debug} />
      </RoomContext.Provider>
    </div>
  );
}
