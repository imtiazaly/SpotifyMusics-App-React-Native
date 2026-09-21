import { useRef } from 'react';
import { View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import TrackPlayer, { useIsPlaying, usePlaybackState, PlaybackState } from '@rntp/player';
import Ionicons from '@react-native-vector-icons/ionicons';

const ControlCenter = () => {
  const playing = useIsPlaying();
  const playbackState = usePlaybackState();
  const isBuffering = playbackState === PlaybackState.Buffering;
  const isNavigating = useRef(false);

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

  const togglePlayback = () => {
    if (playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={skipToPrevious}
        style={({ pressed }) => [styles.navButton, pressed && styles.pressed]}
      >
        <Ionicons name="arrow-back" size={32} style={styles.icon} />
      </Pressable>

      <Pressable
        onPress={togglePlayback}
        style={({ pressed }) => [styles.playButton, pressed && styles.pressed]}
      >
        {isBuffering ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Ionicons
            name={playing ? 'pause' : 'play'}
            size={32}
            style={styles.icon}
          />
        )}
      </Pressable>

      <Pressable
        onPress={skipToNext}
        style={({ pressed }) => [styles.navButton, pressed && styles.pressed]}
      >
        <Ionicons name="arrow-forward" size={32} style={styles.icon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  navButton: {
    padding: 8,
  },
  playButton: {
    marginHorizontal: 28,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00363a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.96 }],
  },
});

export default ControlCenter;

