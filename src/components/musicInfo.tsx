import { StyleSheet, Text, View, Pressable } from 'react-native';
import { MediaItem } from '@rntp/player';
import Ionicons from '@react-native-vector-icons/ionicons';

type MusicInfoProps = {
  track: MediaItem | null | undefined;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

const MusicInfo = ({ track, isFavorite = false, onToggleFavorite }: MusicInfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {track?.title || 'Unknown Title'}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {track?.artist || 'Unknown Artist'}
          {track?.albumTitle ? ` • ${track.albumTitle}` : ''}
        </Text>
      </View>

      <Pressable
        onPress={onToggleFavorite}
        style={({ pressed }) => [styles.favoriteButton, pressed && styles.pressed]}
        hitSlop={12}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={26}
          color={isFavorite ? '#1DB954' : '#b3b3b3'}
        />
      </Pressable>
    </View>
  );
};

export default MusicInfo;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 18,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 14,
    fontWeight: '500',
  },
  favoriteButton: {
    padding: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.9 }],
  },
});

