import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import MainNav from './src/routes/MainNav';

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

  return <MainNav />;
}
