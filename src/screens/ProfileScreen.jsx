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
import React, { useEffect } from 'react';
import { launchImageLibraryAsync } from 'expo-image-picker';

import { AntDesign, Feather } from '@expo/vector-icons';
import defaultImage from '../../assets/image/default.jpg';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectAvatar, selectLogin } from '../redux/auth/authSelectors';
import { logout, updateUser } from '../redux/auth/authOperation';
import { getUserPosts } from '../redux/posts/postsOperation';
import { selectPosts } from '../redux/posts/postsSelectors';

const ProfileScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

  const avatar = useSelector(selectAvatar);
  const login = useSelector(selectLogin);
  const posts = useSelector(selectPosts);

  const logoutUser = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };  

  const takeGalleryPhoto = async () => {
    try {
      const result = await launchImageLibraryAsync(
        (options = { mediaType: 'photo' })
      );
      const photoPath = result.assets[0].uri;
      if (photoPath) {dispatch(updateUser(photoPath))}
    } catch (error) {
      alert(error);
    }    
  };

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
              source={avatar ? { uri: avatar } : defaultImage}
              style={styles.imageStyle}
            />
            <View>
              {!avatar ? (
                <AntDesign
                  onPress={takeGalleryPhoto}
                  name="pluscircleo"
                  size={25}
                  color="#FF6C00"
                  style={styles.avatarAddButton}
                />
              ) : (
                <AntDesign
                  onPress={() => dispatch(updateUser(''))}
                  name="closecircleo"
                  size={25}
                  color="#E8E8E8"
                  backgroundColor={'#FFFFFF'}
                  style={styles.avatarAddButton}
                />
              )}
              <Feather
                onPress={logoutUser}
                style={styles.exitButton}
                name="log-out"
                size={24}
                color="#BDBDBD"
              />
            </View>
          </View>
          <Text style={styles.userName}>{login}</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={posts}
            renderItem={({ item }) => (
              <View style={styles.cardBox}>
                <Image
                  style={styles.postImageStyle}
                  source={item && { uri: item.postImage }}
                />
                <Text style={styles.imageTitle}>{item.placeName}</Text>
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
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Map')}
                    style={{ marginLeft: 'auto' }}
                  >
                    <View style={styles.postStats}>
                      <Feather
                        style={{ marginRight: 4 }}
                        name="map-pin"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={styles.locationText}>
                        {item.region}, {item.country}
                      </Text>
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
