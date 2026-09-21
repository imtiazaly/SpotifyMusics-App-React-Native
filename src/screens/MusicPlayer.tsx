import { useCallback, useEffect, useRef } from 'react';
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
  const currentIndexRef = useRef(0);
  const isProgrammaticScroll = useRef(false);

  // Sync FlatList scroll position when active track changes via Next/Prev buttons
  useEffect(() => {
    if (!activeTrack) return;
    const index = playListData.findIndex(
      (item) => item.mediaId === activeTrack.mediaId || item.title === activeTrack.title
    );
    if (index !== -1 && index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      isProgrammaticScroll.current = true;
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  }, [activeTrack]);

  const renderArtwork = useCallback(({ item }: { item: MediaItem }) => {
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
  }, []);

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
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
        onScrollBeginDrag={() => {
          isProgrammaticScroll.current = false;
        }}
        onMomentumScrollEnd={(e) => {
          if (isProgrammaticScroll.current) {
            isProgrammaticScroll.current = false;
            return;
          }
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          if (
            newIndex >= 0 &&
            newIndex < playListData.length &&
            newIndex !== currentIndexRef.current
          ) {
            currentIndexRef.current = newIndex;
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
