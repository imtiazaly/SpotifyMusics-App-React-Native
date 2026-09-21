import TrackPlayer, { PlayerCommand } from '@rntp/player';

export const setupMusicPlayer = async () => {
  try {
    TrackPlayer.setupPlayer({ contentType: 'music' });
    await TrackPlayer.setCommands({
      capabilities: [
        PlayerCommand.PlayPause,
        PlayerCommand.Next,
        PlayerCommand.Previous,
      ],
    });
    return true;
  } catch (error) {
    console.warn('Player setup warning or already initialized:', error);
    return true;
  }
};