import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../screens/PostsScreen";

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { StyleSheet, View } from "react-native";



const Tabs = createBottomTabNavigator();

const BottomsNav = () => {

return (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Posts') {
          return (
            <AntDesign
              name={'appstore-o'}
              size={24}
              color={focused ? '#FF6C00' : color}
            />
          );
        } else if (route.name === "CreatePost") {
          return (
            <View style={[styles.addPostIcon, { backgroundColor: '#FF6C00' }]}>
              <AntDesign name={'plus'} size={20} color={'#FFFFFF'} />
            </View>
          );
        } else if (route.name === "Profile") {
          return (
            <AntDesign
              name={'user'}
              size={24}
              color={focused ? '#FF6C00' : color}
            />
          );
        }
      },
      tabBarShowLabel: false,
      tabBarStyle: {
        paddingTop: 9,        
      }           
    })}
    
  >
    <Tabs.Screen
      name="Posts"
      component={PostsScreen}
      options={{
        headerTitle: 'Публікації',
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerRight: () => (
          <MaterialCommunityIcons name="logout" size={24} color="#BDBDBD" />
        ),
      }}
    />
    <Tabs.Screen name="CreatePost" component={CreatePostsScreen} />
    <Tabs.Screen name="Profile" component={ProfileScreen} />
  </Tabs.Navigator>
)
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