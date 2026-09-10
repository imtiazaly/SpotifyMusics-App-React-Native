import TrackPlayer, { Event } from '@rntp/player';

export default function registerPlaybackSession() {
  TrackPlayer.registerPlaybackSession(() => {
    TrackPlayer.addEventListener(Event.PlaybackError, ({ code }) => {
      if (code === 'network') {
        TrackPlayer.retry();
      }
    });
  });
}
