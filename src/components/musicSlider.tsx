import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { useProgress } from '@rntp/player';

const musicSlider = () => {
  const { position, duration } = useProgress();
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
        <Text style={styles.time}>
          {new Date(position * 1000).toISOString().substr(14, 5)}
        </Text>
        <Text style={styles.time}>
          {new Date(duration - position * 1000).toISOString().substr(14, 5)}
        </Text>
      </View>
    </View>
  );
};

export default musicSlider;

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
