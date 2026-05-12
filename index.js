/* eslint-disable react-native/no-inline-styles */
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';

const RNRedux = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <KeyboardProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <App />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </KeyboardProvider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => RNRedux);
