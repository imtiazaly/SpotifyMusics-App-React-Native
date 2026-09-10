import TrackPlayer, { PlayerCommand } from '@rntp/player';

export function setupMusicPlayer() {
  TrackPlayer.setupPlayer({
    contentType: 'music',
  });

  TrackPlayer.setCommands({
    capabilities: [
      PlayerCommand.PlayPause,
      PlayerCommand.Next,
      PlayerCommand.Previous,
    ],
  });
}
