import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';

import userImage from '../../assets/image/avatar2x.png';

const POSTS = [
  {
    id: 1,
    image: userImage,
    name: 'Natali Romanova',
    email: 'email@example.com',
  },
];

const PostsScreen = () => {
  const [fontLoader, setfontLoader] = useState(false);
  const [posts, setPosts] = useState(POSTS);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        RobotoMedium: require('../../assets/fonts/RobotoMedium.ttf'),
        RobotoRegular: require('../../assets/fonts/RobotoRegular.ttf'),
        RobotoBold: require('../../assets/fonts/RobotoBold.ttf'),
      });
      setfontLoader(true);
    }
    loadFont();
  }, []);

  if (!fontLoader) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Image source={item.image} style={styles.userPhoto} />
            <View style={styles.textContainer}>
              <Text style={styles.nameTextStyle}>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },

  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 32,
  },

  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },

  textContainer: {
    marginLeft: 8,
  },

  nameTextStyle: {
    fontFamily: 'RobotoBold',
    fontSize: 13,
    color: '#212121',
  },

  emailTextStyle: {
    fontFamily: 'RobotoRegular',
    fontSize: 11,
    color: 'rgba(33, 33, 33, 0.8)',
  },
});

export default PostsScreen;
