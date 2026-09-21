import TrackPlayer, { PlayerCommand } from '@rntp/player';

let isSetup = false;

export const setupMusicPlayer = async () => {
  if (isSetup) {
    return true;
  }
  try {
    TrackPlayer.setupPlayer({ contentType: 'music' });
    await TrackPlayer.setCommands({
      capabilities: [
        PlayerCommand.PlayPause,
        PlayerCommand.Next,
        PlayerCommand.Previous,
      ],
    });
    isSetup = true;
    return true;
  } catch (error) {
    console.warn('Player setup warning:', error);
    isSetup = true;
    return true;
  }
};