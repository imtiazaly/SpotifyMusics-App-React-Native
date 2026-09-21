import { StyleSheet, Text, View, Pressable } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

type HeaderProps = {
  playlistTitle?: string;
  onCollapsePress?: () => void;
  onOptionsPress?: () => void;
};

const Header = ({
  playlistTitle = 'Milad & Naat Collection',
  onCollapsePress,
  onOptionsPress,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onCollapsePress}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        hitSlop={12}
      >
        <Ionicons name="chevron-down" size={24} color="#FFFFFF" />
      </Pressable>

      <View style={styles.titleContainer}>
        <Text style={styles.subTitle}>PLAYING FROM PLAYLIST</Text>
        <Text style={styles.mainTitle} numberOfLines={1}>
          {playlistTitle}
        </Text>
      </View>

      <Pressable
        onPress={onOptionsPress}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        hitSlop={12}
      >
        <Ionicons name="ellipsis-horizontal" size={22} color="#FFFFFF" />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  subTitle: {
    color: '#a7a7a7',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
