import TrackPlayer from '@rntp/player';
import { playListData } from '../constants';

export const loadPlaylist = async (): Promise<boolean> => {
  for (let attempt = 0; attempt < 25; attempt++) {
    try {
      TrackPlayer.setMediaItems(playListData);
      const queue = TrackPlayer.getQueue();
      if (queue && queue.length > 0) {
        return true;
      }
    } catch (e) {
      console.warn('Waiting for player controller to bind:', e);
    }
    await new Promise((resolve) => setTimeout(resolve, 120));
  }
  return false;
};
