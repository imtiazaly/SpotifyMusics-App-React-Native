import TrackPlayer from '@rntp/player';

import { playListData } from '../constants';

export function loadPlaylist() {
  TrackPlayer.setMediaItems(playListData);
}
