import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authOperation";

const Tabs = createBottomTabNavigator();

const BottomsNav = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const logoutUser = () => {
    dispatch(logout());
    navigation.navigate('Login');
  }

return (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        if (route.name === 'Posts') {
          return (
            <View
              style={[
                styles.addPostIcon,
                focused
                  ? { backgroundColor: '#FF6C00' }
                  : { backgroundColor: 'transparent' },
              ]}
            >
              <AntDesign
                name={'appstore-o'}
                size={24}
                color={'rgba(33, 33, 33, 0.8)'}
              />
            </View>
          );
        } else if (route.name === 'CreatePost') {
          return (
            <View
              style={[
                styles.addPostIcon,
                focused
                  ? { backgroundColor: '#FF6C00' }
                  : { backgroundColor: 'transparent' },
              ]}
            >
              <AntDesign
                name={'plus'}
                size={20}
                color={'rgba(33, 33, 33, 0.8)'}
              />
            </View>
          );
        } else if (route.name === 'Profile') {
          return (
            <View
              style={[
                styles.addPostIcon,
                focused
                  ? { backgroundColor: '#FF6C00' }
                  : { backgroundColor: 'transparent' },
              ]}
            >
              <AntDesign
                name={'user'}
                size={24}
                color={'rgba(33, 33, 33, 0.8)'}
              />
            </View>
          );
        }
      },
      tabBarShowLabel: false,
      tabBarStyle: {
        paddingTop: 9,
        paddingBottom: 9,
      },
    })}
  >
    <Tabs.Screen
      name="Posts"
      component={PostsScreen}
      options={{
        unmountOnBlur: true,
        headerTitle: 'Публікації',
        headerTitleAlign: 'center',
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerRight: () => (
          <MaterialCommunityIcons
            onPress={logoutUser}
            name="logout"
            size={24}
            color="#BDBDBD"
          />
        ),
      }}
    />
    <Tabs.Screen
      name="CreatePost"
      component={CreatePostsScreen}
      options={{
        unmountOnBlur: true,
        headerTitle: 'Створити публікацію',
        headerTitleAlign: 'center',
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        tabBarStyle: { display: 'none' },
        headerLeft: () => (
          <AntDesign
            onPress={() => navigation.navigate('Posts')}
            name="arrowleft"
            size={24}
            color="black"
          />
        ),
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false, unmountOnBlur: true }}
    />
  </Tabs.Navigator>
);
}

const styles = StyleSheet.create({
  addPostIcon: {
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default BottomsNav;