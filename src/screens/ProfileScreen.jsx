import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';

import { AntDesign, Feather } from '@expo/vector-icons';

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

const ProfileScreen = () => {
  const [fontLoader, setfontLoader] = useState(false);
  const [userAvatar, setUserAvatar] = useState(true);
  const [userPosts, setUserPosts] = useState(POFILEPOSTS);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        RobotoMedium: require('../../assets/fonts/RobotoMedium.ttf'),
        RobotoRegular: require('../../assets/fonts/RobotoRegular.ttf'),
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
      <ImageBackground
        source={require('../../assets/image/BGI2x.jpg')}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.formContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/image/avatar2x.png')}
              style={styles.imageStyle}
            />
            <View>
              {!userAvatar ? (
                <AntDesign
                  name="pluscircleo"
                  size={25}
                  color="#FF6C00"
                  style={styles.avatarAddButton}
                />
              ) : (
                <AntDesign
                  name="closecircleo"
                  size={25}
                  color="#E8E8E8"
                  backgroundColor={'#FFFFFF'}
                  style={styles.avatarAddButton}
                />
              )}
              <Feather
                style={styles.exitButton}
                name="log-out"
                size={24}
                color="#BDBDBD"
              />
            </View>
          </View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={userPosts}
            renderItem={({ item }) => (
              <View style={styles.cardBox}>
                <Image style={styles.postImageStyle} source={item.image} />
                <Text style={styles.imageTitle}>{item.title}</Text>
                <View style={styles.statsContainer}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Comments')}
                  >
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
                  <TouchableOpacity onPress={()=> navigation.navigate('Map')} style={{ marginLeft: 'auto' }}>
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
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    marginTop: 120,
  },

  avatarContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },

  imageStyle: {
    position: 'absolute',
    marginHorizontal: 'auto',
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  avatarAddButton: {
    position: 'absolute',
    left: 48,
    top: 20,
    borderRadius: 14,
    overflow: 'hidden',
  },

  exitButton: {
    position: 'absolute',
    top: 20,
    left: 160,
  },

  userName: {
    marginTop: 92,
    marginBottom: 33,
    fontFamily: 'RobotoMedium',
    fontSize: 30,
    textAlign: 'center',
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

export default ProfileScreen;
