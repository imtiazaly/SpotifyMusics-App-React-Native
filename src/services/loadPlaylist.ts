import TrackPlayer from '@rntp/player';
import { playListData } from '../constants';

export const loadPlaylist = async () => {
  await TrackPlayer.setMediaItems(playListData);
};
