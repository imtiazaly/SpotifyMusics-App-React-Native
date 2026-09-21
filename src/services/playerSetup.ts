import TrackPlayer, { PlayerCommand } from '@rntp/player';

export const setupMusicPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer({ contentType: 'music' });
    await TrackPlayer.setCommands({
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