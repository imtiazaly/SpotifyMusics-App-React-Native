import {
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import { MediaItem } from '@rntp/player';
import Ionicons from '@react-native-vector-icons/ionicons';
import { playListData } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

type QueueModalProps = {
  visible: boolean;
  onClose: () => void;
  activeTrackId?: string;
  onSelectTrack: (index: number) => void;
};

const QueueModal = ({
  visible,
  onClose,
  activeTrackId,
  onSelectTrack,
}: QueueModalProps) => {
  const renderItem = ({ item, index }: { item: MediaItem; index: number }) => {
    const isCurrent = item.mediaId === activeTrackId;

    return (
      <Pressable
        onPress={() => {
          onSelectTrack(index);
          onClose();
        }}
        style={({ pressed }) => [
          styles.itemRow,
          isCurrent && styles.activeItemRow,
          pressed && styles.pressedRow,
        ]}
      >
        <Text style={[styles.indexText, isCurrent && styles.activeIndexText]}>
          {index + 1}
        </Text>

        <Image
          source={
            item.artworkUrl ? { uri: item.artworkUrl.toString() } : undefined
          }
          style={styles.thumbnail}
          resizeMode="cover"
        />

        <View style={styles.trackDetails}>
          <Text
            style={[styles.trackTitle, isCurrent && styles.activeTitle]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text style={styles.trackArtist} numberOfLines={1}>
            {item.artist}
          </Text>
        </View>

        {isCurrent && (
          <View style={styles.nowPlayingIndicator}>
            <Ionicons name="volume-high" size={20} color="#1DB954" />
          </View>
        )}
      </Pressable>
    );
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
          {/* Header Bar */}
          <View style={styles.header}>
            <View style={styles.dragPill} />
            <View style={styles.titleRow}>
              <View>
                <Text style={styles.headerTitle}>Queue</Text>
                <Text style={styles.headerSubtitle}>
                  {playListData.length} Songs in Playlist
                </Text>
              </View>

              <Pressable
                onPress={onClose}
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && styles.pressedRow,
                ]}
                hitSlop={12}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>

          {/* Song List */}
          <FlatList
            data={playListData}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.mediaId || `${index}`}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default QueueModal;

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
    maxHeight: '80%',
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
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
  titleRow: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    color: '#a7a7a7',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  activeItemRow: {
    backgroundColor: 'rgba(29, 185, 84, 0.12)',
  },
  pressedRow: {
    opacity: 0.6,
  },
  indexText: {
    color: '#a7a7a7',
    fontSize: 14,
    fontWeight: '600',
    width: 26,
    textAlign: 'center',
  },
  activeIndexText: {
    color: '#1DB954',
    fontWeight: '800',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginLeft: 8,
    marginRight: 14,
    backgroundColor: '#1b2b32',
  },
  trackDetails: {
    flex: 1,
  },
  trackTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  activeTitle: {
    color: '#1DB954',
    fontWeight: '700',
  },
  trackArtist: {
    color: '#a7a7a7',
    fontSize: 13,
  },
  nowPlayingIndicator: {
    marginLeft: 10,
    paddingRight: 4,
  },
});
