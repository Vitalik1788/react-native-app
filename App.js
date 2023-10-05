import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import store from './src/redux/store';

import MainNav from './src/routes/MainNav';
import { ActivityIndicator } from 'react-native';

export default function App() {
  const [fontLoader, setfontLoader] = useState(false);

  useEffect(() => {
    async function loadFont() {
      try {
        await Font.loadAsync({
          RobotoMedium: require('./assets/fonts/RobotoMedium.ttf'),
          RobotoRegular: require('./assets/fonts/RobotoRegular.ttf'),
          RobotoBold: require('./assets/fonts/RobotoBold.ttf'),
        });
        setfontLoader(true);
      } catch (error) {
        console.log(error);
      }
    }
    loadFont();
  }, []);

  if (!fontLoader) {
    return null;
  }

  return (
    <Provider store={store.store}>
      <PersistGate
        persistor={store.persistor}
        loading={<ActivityIndicator size={"large"} color={"dark blue"}/>}
      >
        <MainNav />
      </PersistGate>
    </Provider>
  );
}
