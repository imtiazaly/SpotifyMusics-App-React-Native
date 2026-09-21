import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer from '@rntp/player';
import Ionicons from '@react-native-vector-icons/ionicons';

const VolumeControl = () => {
  const [volume, setVolume] = useState(0.8);
  const previousVolume = useRef(0.8);

  useEffect(() => {
    try {
      const currentVol = TrackPlayer.getVolume();
      if (typeof currentVol === 'number' && !isNaN(currentVol)) {
        setVolume(currentVol);
        if (currentVol > 0) {
          previousVolume.current = currentVol;
        }
      }
    } catch (e) {
      console.warn('Could not read initial volume:', e);
    }
  }, []);

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (newVol > 0) {
      previousVolume.current = newVol;
    }
    TrackPlayer.setVolume(newVol);
  };

  const toggleMute = () => {
    if (volume > 0) {
      previousVolume.current = volume;
      setVolume(0);
      TrackPlayer.setVolume(0);
    } else {
      const restored = previousVolume.current > 0 ? previousVolume.current : 0.7;
      setVolume(restored);
      TrackPlayer.setVolume(restored);
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return 'volume-mute';
    if (volume < 0.5) return 'volume-low';
    return 'volume-high';
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={toggleMute}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        hitSlop={10}
      >
        <Ionicons name={getVolumeIcon()} size={20} color="#a7a7a7" />
      </Pressable>

      <Slider
        value={volume}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="rgba(255, 255, 255, 0.18)"
        thumbTintColor="#FFFFFF"
        onValueChange={handleVolumeChange}
        style={styles.slider}
      />

      <Text style={styles.percentageText}>{Math.round(volume * 100)}%</Text>
    </View>
  );
};

export default VolumeControl;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginTop: 2,
    marginBottom: 8,
    alignSelf: 'center',
  },
  iconButton: {
    padding: 6,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 30,
    marginHorizontal: 8,
  },
  percentageText: {
    color: '#a7a7a7',
    fontSize: 11,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
    minWidth: 32,
    textAlign: 'right',
  },
  pressed: {
    opacity: 0.5,
  },
});
