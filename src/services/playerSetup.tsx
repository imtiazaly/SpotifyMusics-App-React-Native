import TrackPlayer, { PlayerCommand } from '@rntp/player';

export async function setupMusicPlayer() {
  let isSetUp = false;
  try {
    TrackPlayer.getActiveMediaItem();
    isSetUp = true;
  } catch (error) {
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
    isSetUp = true;
  } finally {
    return isSetUp;
  }
}
