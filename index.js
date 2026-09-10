/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import registerPlaybackSession from './musicPlayerServices';

registerPlaybackSession();

AppRegistry.registerComponent(appName, () => App);
