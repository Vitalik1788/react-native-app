import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';

import { AntDesign, Feather } from '@expo/vector-icons';






const ProfileScreen = () => {
  const [fontLoader, setfontLoader] = useState(false);
  const [userAvatar, setUserAvatar] = useState(true);


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
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image/BGImage.jpg')}
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
                  backgroundColor={"#FFFFFF"}
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

          <View>
            <Image
              style={styles.postImageStyle}
              source={require('../../assets/image/sea.jpg')}
            />
            <Text style={styles.imageTitle}>Захід на Чорному морі</Text>
            <View style={styles.statsContainer}>
              <View style={[styles.postStats, { marginRight: 24 }]}>
                <Feather
                  style={{ marginRight: 9 }}
                  name="message-circle"
                  size={24}
                  color="#FF6C00"
                />
                <Text>3</Text>
              </View>
              <View style={styles.postStats}>
                <Feather
                  style={{ marginRight: 9 }}
                  name="thumbs-up"
                  size={24}
                  color="#FF6C00"
                />
                <Text>200</Text>
              </View>
              <View style={[styles.postStats, { marginLeft: 'auto' }]}>
                <Feather
                  style={{ marginRight: 4 }}
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                />
                <Text style={styles.locationText}>Ukraine</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
  },

  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  formContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
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
    overflow: "hidden",
 },

  exitButton: {
    position: 'absolute',
    top: 20,
    left: 150,
  },

  userName: {
    marginTop: 92,
    marginBottom: 33,
    fontFamily: 'RobotoMedium',
    fontSize: 30,
    textAlign: 'center',
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
    textDecorationLine: "underline",
  },
});

export default ProfileScreen;