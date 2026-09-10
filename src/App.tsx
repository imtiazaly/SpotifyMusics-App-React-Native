import { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { setupMusicPlayer } from './services/playerSetup';

function App() {
  useEffect(() => {
    setupMusicPlayer();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar />
      <SafeAreaView>
        <Text>This App is going to be a Spotify Music App!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
