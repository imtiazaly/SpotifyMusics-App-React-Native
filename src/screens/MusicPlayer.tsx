import { useEffect, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import TrackPlayer, { MediaItem, useActiveMediaItem } from '@rntp/player';
import { playListData } from '../constants';
import MusicSlider from '../components/MusicSlider';
import ControlCenter from '../components/ControlCenter';
import MusicInfo from '../components/MusicInfo';

const { width } = Dimensions.get('window');

const MusicPlayer = () => {
  const flatListRef = useRef<FlatList<MediaItem>>(null);
  const activeTrack = useActiveMediaItem();
  const currentTrack = activeTrack || playListData[0];

  // Sync FlatList scroll position when active track changes (e.g. Next/Prev button pressed)
  useEffect(() => {
    if (!activeTrack) return;
    const index = playListData.findIndex(
      (item) => item.mediaId === activeTrack.mediaId || item.title === activeTrack.title
    );
    if (index !== -1) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  }, [activeTrack]);

  const renderArtwork = ({ item }: { item: MediaItem }) => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          <Image
            source={{ uri: item.artworkUrl?.toString() }}
            style={styles.albumArtImg}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={playListData}
        renderItem={renderArtwork}
        keyExtractor={(item: MediaItem) => item.mediaId || item.title || item.url.toString()}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          if (newIndex >= 0 && newIndex < playListData.length) {
            TrackPlayer.skipToIndex(newIndex);
          }
        }}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
          }, 100);
        }}
      />
      <MusicInfo track={currentTrack} />
      <MusicSlider />
      <ControlCenter />
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
