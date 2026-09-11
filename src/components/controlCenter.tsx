import { View, Text, StyleSheet, Pressable } from 'react-native';
import TrackPlayer, { useIsPlaying } from '@rntp/player';
import Ionicons from '@react-native-vector-icons/ionicons';

const ControlCenter = () => {
  const playing = useIsPlaying();

  const skipToNext = () => {
    TrackPlayer.skipToNext();
  };

  const skipToPrevious = () => {
    TrackPlayer.skipToPrevious();
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
      <Pressable onPress={skipToPrevious}>
        <Ionicons name="arrow-back" size={32} style={styles.icon} />
      </Pressable>

      <Pressable onPress={togglePlayback} style={styles.playButton}>
        <Ionicons
          name={playing ? 'pause' : 'play'}
          size={32}
          style={styles.icon}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
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
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});

export default ControlCenter;
