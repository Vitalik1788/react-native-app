import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationForm from '../screens/RegistrationScreen';
import LoginForm from "../screens/LoginScreen";

import BottomsNav from '../routes/BottomsNav';
import PostsScreen from '../screens/PostsScreen';

const MainStack = createStackNavigator();

const MainNav = () => {

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name="Registration"
          component={RegistrationForm}
          options={{ headerShown: false, headerTitle: 'Реєстрація' }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginForm}
          options={{ headerShown: false, headerTitle: 'Вхід' }}
        />

        <MainStack.Screen
          name="Home"
          component={BottomsNav}
          options={{ headerShown: false }}
        />        
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;
