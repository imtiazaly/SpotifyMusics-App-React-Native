import TrackPlayer from '@rntp/player';

import { playListData } from '../constants';

export const loadPlaylist = () => {
  TrackPlayer.setMediaItems(playListData);
};
