import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationForm from '../screens/RegistrationScreen';
import LoginForm from "../screens/LoginScreen";

import BottomsNav from '../routes/BottomsNav';
import CommentsScreen from '../screens/CommentsScreen';

import { AntDesign } from '@expo/vector-icons';
import MapScreen from '../screens/MapScreen';

const MainStack = createStackNavigator();


const MainNav = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
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

        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={({ navigation: { goBack } }) => ({
            headerTitle: 'Коментарі',
            headerTitleAlign: 'center',
            headerRightContainerStyle: { paddingRight: 16 },
            headerLeftContainerStyle: { paddingLeft: 16 },
            headerLeft: () => (
              <AntDesign
                onPress={() => goBack()}
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            ),
          })}
        />

        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={({ navigation: { goBack } }) => ({
            headerTitle: 'Місце розташування',
              headerTitleAlign: 'center',
              headerRightContainerStyle: { paddingRight: 16 },
              headerLeftContainerStyle: { paddingLeft: 16 },
              headerLeft: () => (
                <AntDesign
                  onPress={() => goBack()}
                  name="arrowleft"
                  size={24}
                  color="black"
                />
              ),
          })}

          // options={{
          //   headerTitle: 'Місце розташування',
          //   headerTitleAlign: 'center',
          //   headerRightContainerStyle: { paddingRight: 16 },
          //   headerLeftContainerStyle: { paddingLeft: 16 },
          //   headerLeft: () => (
          //     <AntDesign
          //       onPress={() => navigation.navigate('Posts')}
          //       name="arrowleft"
          //       size={24}
          //       color="black"
          //     />
          //   ),
          // }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;
