import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import TrackPlayer, {
  useIsPlaying,
  usePlaybackState,
  PlaybackState,
  RepeatMode,
} from '@rntp/player';
import Ionicons from '@react-native-vector-icons/ionicons';

const ControlCenter = () => {
  const playing = useIsPlaying();
  const playbackState = usePlaybackState();
  const isBuffering = playbackState === PlaybackState.Buffering;
  const isNavigating = useRef(false);

  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatModeState] = useState<RepeatMode>(RepeatMode.Off);

  useEffect(() => {
    try {
      setShuffle(TrackPlayer.isShuffleEnabled());
      setRepeatModeState(TrackPlayer.getRepeatMode());
    } catch (e) {
      console.warn('Could not initialize shuffle/repeat state:', e);
    }
  }, []);

  const toggleShuffle = () => {
    const next = !shuffle;
    setShuffle(next);
    TrackPlayer.setShuffleEnabled(next);
  };

  const toggleRepeat = () => {
    let next: RepeatMode;
    if (repeatMode === RepeatMode.Off) {
      next = RepeatMode.All;
    } else if (repeatMode === RepeatMode.All) {
      next = RepeatMode.One;
    } else {
      next = RepeatMode.Off;
    }
    setRepeatModeState(next);
    TrackPlayer.setRepeatMode(next);
  };

  const skipToNext = () => {
    if (isNavigating.current) return;
    isNavigating.current = true;
    TrackPlayer.skipToNext();
    setTimeout(() => {
      isNavigating.current = false;
    }, 400);
  };

  const skipToPrevious = () => {
    if (isNavigating.current) return;
    isNavigating.current = true;
    TrackPlayer.skipToPrevious();
    setTimeout(() => {
      isNavigating.current = false;
    }, 400);
  };

  const seekBackward10 = () => {
    TrackPlayer.seekBy(-10);
  };

  const seekForward10 = () => {
    TrackPlayer.seekBy(10);
  };

  const togglePlayback = () => {
    if (playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Quick 10-second seek pill buttons */}
      <View style={styles.quickSeekRow}>
        <Pressable
          onPress={seekBackward10}
          style={({ pressed }) => [styles.seekPill, pressed && styles.pressed]}
          hitSlop={8}
        >
          <Ionicons
            name="refresh-outline"
            size={14}
            color="#a7a7a7"
            style={{ transform: [{ scaleX: -1 }] }}
          />
          <Text style={styles.seekPillText}>10s</Text>
        </Pressable>

        <Pressable
          onPress={seekForward10}
          style={({ pressed }) => [styles.seekPill, pressed && styles.pressed]}
          hitSlop={8}
        >
          <Text style={styles.seekPillText}>10s</Text>
          <Ionicons name="refresh-outline" size={14} color="#a7a7a7" />
        </Pressable>
      </View>

      {/* Main Flagship Control Row */}
      <View style={styles.container}>
        {/* Shuffle Button */}
        <Pressable
          onPress={toggleShuffle}
          style={({ pressed }) => [styles.sideButton, pressed && styles.pressed]}
          hitSlop={10}
        >
          <Ionicons
            name="shuffle"
            size={24}
            color={shuffle ? '#1DB954' : '#b3b3b3'}
          />
          {shuffle && <View style={styles.activeDot} />}
        </Pressable>

        {/* Previous Track */}
        <Pressable
          onPress={skipToPrevious}
          style={({ pressed }) => [styles.navButton, pressed && styles.pressed]}
          hitSlop={8}
        >
          <Ionicons name="play-skip-back" size={28} color="#FFFFFF" />
        </Pressable>

        {/* Hero Play/Pause Button */}
        <Pressable
          onPress={togglePlayback}
          style={({ pressed }) => [styles.playButton, pressed && styles.playButtonPressed]}
        >
          {isBuffering ? (
            <ActivityIndicator size="small" color="#000000" />
          ) : (
            <Ionicons
              name={playing ? 'pause' : 'play'}
              size={32}
              color="#000000"
              style={!playing ? { marginLeft: 3 } : undefined}
            />
          )}
        </Pressable>

        {/* Next Track */}
        <Pressable
          onPress={skipToNext}
          style={({ pressed }) => [styles.navButton, pressed && styles.pressed]}
          hitSlop={8}
        >
          <Ionicons name="play-skip-forward" size={28} color="#FFFFFF" />
        </Pressable>

        {/* Repeat Button */}
        <Pressable
          onPress={toggleRepeat}
          style={({ pressed }) => [styles.sideButton, pressed && styles.pressed]}
          hitSlop={10}
        >
          <Ionicons
            name="repeat"
            size={24}
            color={repeatMode !== RepeatMode.Off ? '#1DB954' : '#b3b3b3'}
          />
          {repeatMode === RepeatMode.One && (
            <View style={styles.repeatOneBadge}>
              <Text style={styles.repeatOneText}>1</Text>
            </View>
          )}
          {repeatMode === RepeatMode.All && <View style={styles.activeDot} />}
        </Pressable>
      </View>
    </View>
  );
};

export default ControlCenter;

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 4,
  },
  quickSeekRow: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  seekPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  seekPillText: {
    color: '#a7a7a7',
    fontSize: 11,
    fontWeight: '700',
    marginHorizontal: 3,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  sideButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  navButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  playButtonPressed: {
    transform: [{ scale: 0.94 }],
    opacity: 0.85,
  },
  pressed: {
    opacity: 0.5,
  },
  activeDot: {
    position: 'absolute',
    bottom: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1DB954',
  },
  repeatOneBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#1DB954',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  repeatOneText: {
    color: '#000000',
    fontSize: 8,
    fontWeight: '900',
  },
});
