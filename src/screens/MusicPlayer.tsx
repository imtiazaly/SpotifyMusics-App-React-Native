import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MediaItem } from '@rntp/player';
import { useActiveMediaItem } from '@rntp/player';
import { playListData } from '../constants';
import MusicSlider from '../components/MusicSlider';
import ControlCenter from '../components/ControlCenter';
import MusicInfo from '../components/MusicInfo';
const { width } = Dimensions.get('window');

const MusicPlayer = () => {
  const track = useActiveMediaItem();

  const renderArtwork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          <Image
            source={{ uri: track?.artworkUrl?.toString() }}
            style={styles.albumArtImg}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={playListData}
        renderItem={renderArtwork}
        keyExtractor={(item: MediaItem) => item.url.toString()}
      />
      <MusicInfo track={track} />
      <MusicSlider />
      <ControlCenter />
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});
