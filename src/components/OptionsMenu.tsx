import { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import TrackPlayer, { MediaItem } from '@rntp/player';
import Ionicons from '@react-native-vector-icons/ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

type OptionsMenuProps = {
  visible: boolean;
  onClose: () => void;
  currentTrack?: MediaItem | null;
};

const SPEED_OPTIONS = [0.75, 1.0, 1.25, 1.5, 2.0];
const TIMER_OPTIONS = [
  { label: '15 Minutes', seconds: 15 * 60 },
  { label: '30 Minutes', seconds: 30 * 60 },
  { label: '45 Minutes', seconds: 45 * 60 },
  { label: '60 Minutes', seconds: 60 * 60 },
];

const OptionsMenu = ({ visible, onClose, currentTrack }: OptionsMenuProps) => {
  const [speed, setSpeed] = useState(1.0);
  const [activeTimerMinutes, setActiveTimerMinutes] = useState<number | null>(null);

  useEffect(() => {
    try {
      const currentSpeed = TrackPlayer.getPlaybackSpeed();
      if (typeof currentSpeed === 'number' && !isNaN(currentSpeed)) {
        setSpeed(currentSpeed);
      }
      const timer = TrackPlayer.getSleepTimer();
      if (timer && timer.type === 'time') {
        setActiveTimerMinutes(Math.round(timer.remainingSeconds / 60));
      } else {
        setActiveTimerMinutes(null);
      }
    } catch (e) {
      console.warn('Could not read player options state:', e);
    }
  }, [visible]);

  const handleSetSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    TrackPlayer.setPlaybackSpeed(newSpeed);
  };

  const handleSetTimer = (minutes: number) => {
    setActiveTimerMinutes(minutes);
    TrackPlayer.sleepAfterTime(minutes * 60, { fadeOutSeconds: 3 });
  };

  const handleCancelTimer = () => {
    setActiveTimerMinutes(null);
    TrackPlayer.cancelSleepTimer();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.modalContent}>
          {/* Header with Drag Pill */}
          <View style={styles.header}>
            <View style={styles.dragPill} />
            <View style={styles.trackCard}>
              <Image
                source={
                  currentTrack?.artworkUrl
                    ? { uri: currentTrack.artworkUrl.toString() }
                    : undefined
                }
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle} numberOfLines={1}>
                  {currentTrack?.title || 'Unknown Title'}
                </Text>
                <Text style={styles.trackArtist} numberOfLines={1}>
                  {currentTrack?.artist || 'Unknown Artist'}
                </Text>
              </View>
              <Pressable
                onPress={onClose}
                style={({ pressed }) => [
                  styles.closeBtn,
                  pressed && styles.pressed,
                ]}
                hitSlop={12}
              >
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollBody}
          >
            {/* Section 1: Playback Speed */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="speedometer-outline"
                  size={20}
                  color="#1DB954"
                />
                <Text style={styles.sectionTitle}>Playback Speed</Text>
                <Text style={styles.activeValueBadge}>{speed}x</Text>
              </View>

              <View style={styles.speedRow}>
                {SPEED_OPTIONS.map(item => {
                  const isSelected = speed === item;
                  return (
                    <Pressable
                      key={item}
                      onPress={() => handleSetSpeed(item)}
                      style={[
                        styles.speedPill,
                        isSelected && styles.speedPillActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.speedPillText,
                          isSelected && styles.speedPillTextActive,
                        ]}
                      >
                        {item}x
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Section 2: Sleep Timer */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="moon-outline" size={20} color="#1DB954" />
                <Text style={styles.sectionTitle}>Sleep Timer</Text>
                {activeTimerMinutes !== null && (
                  <Text style={styles.activeValueBadge}>
                    ~{activeTimerMinutes}m left
                  </Text>
                )}
              </View>

              <View style={styles.timerList}>
                {TIMER_OPTIONS.map(opt => {
                  const minutes = opt.seconds / 60;
                  const isSelected = activeTimerMinutes === minutes;

                  return (
                    <Pressable
                      key={opt.seconds}
                      onPress={() => handleSetTimer(minutes)}
                      style={({ pressed }) => [
                        styles.timerItem,
                        isSelected && styles.timerItemActive,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text
                        style={[
                          styles.timerItemText,
                          isSelected && styles.timerItemTextActive,
                        ]}
                      >
                        {opt.label}
                      </Text>
                      {isSelected && (
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color="#1DB954"
                        />
                      )}
                    </Pressable>
                  );
                })}

                {activeTimerMinutes !== null && (
                  <Pressable
                    onPress={handleCancelTimer}
                    style={({ pressed }) => [
                      styles.cancelTimerBtn,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Ionicons
                      name="close-circle-outline"
                      size={18}
                      color="#FF5252"
                    />
                    <Text style={styles.cancelTimerText}>Turn Off Timer</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default OptionsMenu;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#0c1a20',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  dragPill: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginBottom: 12,
  },
  trackCard: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#1b2b32',
  },
  trackInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  trackTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },
  trackArtist: {
    color: '#a7a7a7',
    fontSize: 12,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollBody: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
    flex: 1,
  },
  activeValueBadge: {
    color: '#1DB954',
    fontSize: 13,
    fontWeight: '700',
  },
  speedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  speedPill: {
    flex: 1,
    marginHorizontal: 3,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedPillActive: {
    backgroundColor: '#1DB954',
  },
  speedPillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  speedPillTextActive: {
    color: '#000000',
  },
  timerList: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  timerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  timerItemActive: {
    backgroundColor: 'rgba(29, 185, 84, 0.12)',
  },
  timerItemText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  timerItemTextActive: {
    color: '#1DB954',
    fontWeight: '700',
  },
  cancelTimerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  cancelTimerText: {
    color: '#FF5252',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  pressed: {
    opacity: 0.6,
  },
});
