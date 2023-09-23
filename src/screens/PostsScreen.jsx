import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';



import userImage from '../../assets/image/avatar2x.png';
import forest from '../../assets/image/forest.jpg';
import sea from '../../assets/image/sea.jpg';
import italy from '../../assets/image/italy.jpg';
import { useNavigation } from '@react-navigation/native';

const POFILEPOSTS = [
  {
    id: 1,
    image: forest,
    title: 'Ліс',
    comments: 8,
    likes: 153,
    location: 'Ukraine',
  },
  {
    id: 2,
    image: sea,
    title: 'Захід на Чорному морі',
    comments: 3,
    likes: 200,
    location: 'Ukraine',
  },
  {
    id: 3,
    image: italy,
    title: 'Старий будиночок у Венеції',
    comments: 50,
    likes: 200,
    location: 'Italy',
  },
];

const PostsScreen = () => {
  const [fontLoader, setfontLoader] = useState(false);
  const [userPosts, setUserPosts] = useState(POFILEPOSTS);
  const navigation = useNavigation();


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
      <View style={styles.userContainer}>
        <Image source={userImage} style={styles.userPhoto} />
        <View style={styles.textContainer}>
          <Text style={styles.nameTextStyle}>Natali Romanova</Text>
          <Text>email@example.com</Text>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={userPosts}
        renderItem={({ item }) => (
          <View style={styles.cardBox}>
            <Image style={styles.postImageStyle} source={item.image} />
            <Text style={styles.imageTitle}>{item.title}</Text>
            <View style={styles.statsContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
                <View style={[styles.postStats, { marginRight: 24 }]}>
                  <Feather
                    style={{ marginRight: 9 }}
                    name="message-circle"
                    size={24}
                    color="#FF6C00"
                  />
                  <Text>{item.comments}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.postStats}>
                <Feather
                  style={{ marginRight: 9 }}
                  name="thumbs-up"
                  size={24}
                  color="#FF6C00"
                />
                <Text>{item.likes}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Map")} style={{ marginLeft: 'auto' }}>
                <View style={styles.postStats}>
                  <Feather
                    style={{ marginRight: 4 }}
                    name="map-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
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

  cardBox: {
    marginBottom: 32,
  },

  postImageStyle: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },

  imageTitle: {
    fontFamily: 'RobotoMedium',
    fontSize: 16,
    marginBottom: 8,
  },

  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  postStats: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationText: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    color: '#212121',
    textDecorationLine: 'underline',
  },
});

export default PostsScreen;
