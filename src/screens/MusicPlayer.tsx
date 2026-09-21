import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import TrackPlayer, { MediaItem, useActiveMediaItem } from '@rntp/player';
import Ionicons from '@react-native-vector-icons/ionicons';
import { playListData } from '../constants';
import Header from '../components/Header';
import MusicSlider from '../components/MusicSlider';
import VolumeControl from '../components/VolumeControl';
import ControlCenter from '../components/ControlCenter';
import MusicInfo from '../components/MusicInfo';
import QueueModal from '../components/QueueModal';
import OptionsMenu from '../components/OptionsMenu';

const { width } = Dimensions.get('window');

const MusicPlayer = () => {
  const flatListRef = useRef<FlatList<MediaItem>>(null);
  const activeTrack = useActiveMediaItem();
  const currentTrack = activeTrack || playListData[0];
  const currentIndexRef = useRef(0);
  const isProgrammaticScroll = useRef(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [queueModalVisible, setQueueModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  const handleSelectTrackFromQueue = (index: number) => {
    currentIndexRef.current = index;
    isProgrammaticScroll.current = true;
    flatListRef.current?.scrollToIndex({ index, animated: true });
    TrackPlayer.skipToIndex(index);
  };

  const toggleFavorite = (mediaId?: string) => {
    if (!mediaId) return;
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(mediaId)) {
        next.delete(mediaId);
      } else {
        next.add(mediaId);
      }
      return next;
    });
  };

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Sync FlatList scroll position when active track changes via Next/Prev buttons
  useEffect(() => {
    if (!activeTrack) return;
    const index = playListData.findIndex(
      (item) => item.mediaId === activeTrack.mediaId || item.title === activeTrack.title
    );
    if (index !== -1 && index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      setCurrentSlideIndex(index);
      isProgrammaticScroll.current = true;
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  }, [activeTrack]);

  const renderArtwork = useCallback(({ item }: { item: MediaItem }) => {
    return (
      <View style={styles.listArtWrapper}>
        {/* Soft Ambient Glow backdrop */}
        <View style={styles.ambientGlow} />

        <View style={styles.albumContainer}>
          {item.artworkUrl ? (
            <Image
              source={{ uri: item.artworkUrl.toString() }}
              style={styles.albumArtImg}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons name="musical-notes" size={64} color="#1DB954" />
            </View>
          )}

          {/* Lossless Audio Badge */}
          <View style={styles.losslessBadge}>
            <Ionicons name="sparkles" size={10} color="#1DB954" />
            <Text style={styles.losslessText}>LOSSLESS</Text>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Header
        playlistTitle={currentTrack?.albumTitle || 'Milad & Naat Collection'}
        onOptionsPress={() => setOptionsModalVisible(true)}
      />

      <View style={styles.carouselContainer}>
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
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            if (newIndex >= 0 && newIndex < playListData.length) {
              setCurrentSlideIndex(newIndex);
            }
            if (isProgrammaticScroll.current) {
              isProgrammaticScroll.current = false;
              return;
            }
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

        {/* Carousel Pagination Dots */}
        <View style={styles.paginationDotsRow}>
          {playListData.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentSlideIndex === i && styles.activeDotPill,
              ]}
            />
          ))}
        </View>
      </View>

      <MusicInfo
        track={currentTrack}
        isFavorite={favorites.has(currentTrack?.mediaId || '')}
        onToggleFavorite={() => toggleFavorite(currentTrack?.mediaId)}
      />
      <MusicSlider />
      <ControlCenter />
      <VolumeControl />

      {/* Bottom Footer Bar */}
      <View style={styles.footerBar}>
        <View style={styles.deviceSpeakerInfo}>
          <Ionicons name="phone-portrait-outline" size={16} color="#1DB954" />
          <Text style={styles.deviceSpeakerText}>Phone Speaker</Text>
        </View>

        <Pressable
          onPress={() => setQueueModalVisible(true)}
          style={({ pressed }) => [styles.queueTrigger, pressed && styles.pressed]}
          hitSlop={10}
        >
          <Ionicons name="list-outline" size={22} color="#FFFFFF" />
          <Text style={styles.queueTriggerText}>Queue</Text>
        </Pressable>
      </View>

      <QueueModal
        visible={queueModalVisible}
        onClose={() => setQueueModalVisible(false)}
        activeTrackId={currentTrack?.mediaId}
        onSelectTrack={handleSelectTrackFromQueue}
      />

      <OptionsMenu
        visible={optionsModalVisible}
        onClose={() => setOptionsModalVisible(false)}
        currentTrack={currentTrack}
      />
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#07161b',
    paddingBottom: 6,
  },
  carouselContainer: {
    height: Math.round(width * 0.90 * 0.5625) + 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ambientGlow: {
    position: 'absolute',
    width: width * 0.84,
    height: Math.round(width * 0.90 * 0.5625),
    borderRadius: 16,
    backgroundColor: '#004d40',
    opacity: 0.35,
    transform: [{ scale: 1.05 }],
  },
  albumContainer: {
    width: width * 0.90,
    height: Math.round(width * 0.90 * 0.5625),
    borderRadius: 16,
    backgroundColor: '#0c2228',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.65,
    shadowRadius: 18,
    elevation: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
    position: 'relative',
  },
  albumArtImg: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#071f24',
  },
  losslessBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  losslessText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    marginLeft: 4,
  },
  paginationDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginHorizontal: 3,
  },
  activeDotPill: {
    width: 18,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1DB954',
  },
  footerBar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 2,
    paddingBottom: 4,
  },
  deviceSpeakerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceSpeakerText: {
    color: '#1DB954',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  queueTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  queueTriggerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  pressed: {
    opacity: 0.5,
  },
});
