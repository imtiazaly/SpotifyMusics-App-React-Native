import TrackPlayer, { PlayerCommand } from '@rntp/player';

export const setupMusicPlayer = () => {
  try {
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

    return true;
  } catch (error) {
    console.error('Failed to setup music player:', error);
    return false;
  }
};
