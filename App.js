import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';
import {RootSiblingParent} from 'react-native-root-siblings';
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider style={{flex: 1}}>
            <RootSiblingParent>
              <Navigation />
            </RootSiblingParent>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
