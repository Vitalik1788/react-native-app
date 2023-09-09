import 'react-native-gesture-handler';
import RegistrationForm from './src/screens/RegistrationScreen';
import LoginForm from "./src/screens/LoginScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomsNav from './src/routes/BottomsNav';


const MainStack = createStackNavigator();

export default function App () {
  

  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Home">
          <MainStack.Screen
            name="Реєстрація"
            component={RegistrationForm}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Вхід"
            component={LoginForm}
            options={{ headerShown: false }}
          />

          <MainStack.Screen
            name="Home"
            component={BottomsNav}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
}



