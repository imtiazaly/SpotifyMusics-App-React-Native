import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { setupMusicPlayer } from './services/playerSetup';
import { loadPlaylist } from './services/loadPlaylist';
import MusicPlayer from './screens/MusicPlayer';

function App() {
  const [isPlyerReady, setIsPlyerReady] = useState(false);

  const setup = () => {
    let isSetUp = setupMusicPlayer();

    if (isSetUp) {
      loadPlaylist();
    }
    setIsPlyerReady(isSetUp);
  };

  useEffect(() => {
    setup();
  }, []);

  if (!isPlyerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#001d23' }}>
        <MusicPlayer />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
