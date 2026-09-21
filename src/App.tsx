import { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { setupMusicPlayer } from './services/playerSetup';
import { loadPlaylist } from './services/loadPlaylist';
import MusicPlayer from './screens/MusicPlayer';

function App() {
  const [isPlyerReady, setIsPlyerReady] = useState(false);

  const setup = async () => {
    const isSetUp = await setupMusicPlayer();
    if (isSetUp) {
      await loadPlaylist();
    }
    setIsPlyerReady(isSetUp);
  };
  
  useEffect(() => {
    setup();
  }, []);

  if (!isPlyerReady) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#001d23' }}>
          <ActivityIndicator size="large" color="#1DB954" />
        </SafeAreaView>
      </SafeAreaProvider>
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
