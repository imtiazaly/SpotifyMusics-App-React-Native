import TrackPlayer from '@rntp/player';

import { playListData } from '../constants';

export async function loadPlaylist() {
  TrackPlayer.setMediaItems(playListData);
}
