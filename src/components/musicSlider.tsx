import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress } from '@rntp/player';

const MusicSlider = () => {
  const { position, duration } = useProgress();
  const [isSliding, setIsSliding] = useState(false);
  const [slidingValue, setSlidingValue] = useState(0);

  const currentDisplayPosition = isSliding ? slidingValue : position;

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return '00:00';
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
    return `${formattedMins}:${formattedSecs}`;
  };

  return (
    <View style={styles.container}>
      <Slider
        value={currentDisplayPosition}
        minimumValue={0}
        maximumValue={duration > 0 ? duration : 1}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="rgba(255, 255, 255, 0.18)"
        thumbTintColor="#FFFFFF"
        onSlidingStart={() => {
          setIsSliding(true);
          setSlidingValue(position);
        }}
        onValueChange={(val) => {
          setSlidingValue(val);
        }}
        onSlidingComplete={async (val) => {
          setIsSliding(false);
          await TrackPlayer.seekTo(val);
        }}
        style={styles.slider}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{formatTime(currentDisplayPosition)}</Text>
        <Text style={styles.time}>
          {formatTime(duration > 0 ? duration : 0)}
        </Text>
      </View>
    </View>
  );
};

export default MusicSlider;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 6,
    alignSelf: 'center',
  },
  slider: {
    width: '100%',
    height: 36,
  },
  timeContainer: {
    width: '100%',
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    color: '#a7a7a7',
    fontSize: 12,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
});
