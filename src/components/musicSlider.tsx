import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { useProgress } from '@rntp/player';

const MusicSlider = () => {
  const { position, duration } = useProgress();

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return '00:00';
    }

    return new Date(seconds * 1000).toISOString().slice(14, 19);
  };

  return (
    <View>
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbTintColor="#FFFFFF"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{formatTime(position)}</Text>

        <Text style={styles.time}>{formatTime(duration - position)}</Text>
      </View>
    </View>
  );
};

export default MusicSlider;

const styles = StyleSheet.create({
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,

    flexDirection: 'row',
  },
  timeContainer: {
    width: 340,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#fff',
  },
});
