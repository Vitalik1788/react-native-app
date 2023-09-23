import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const CreatePostsScreen = () => {
  const [fontLoader, setfontLoader] = useState(false);
  const [placeName, setPlaceName] = useState(null);
  const [location, setLocation] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [getLocation, setGetLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }      
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!fontLoader) {
    return null;
  }

  const takeGalleryPhoto = async () => {
    const result = await launchImageLibraryAsync(
      (options = { mediaType: 'photo' })
    );
    const photoPath = result.assets[0].uri;
    if (photoPath) setUserImg(photoPath);
  };

  const handleSubmit = async () => {
    const post = {
      image: userImg,
      placeName,
      location,
    };

    let { coords } = await Location.getCurrentPositionAsync({});
    
    setGetLocation(coords);
    
    setUserImg('');
    setPlaceName('');
    setLocation('');

    navigation.navigate('Posts');
  };

  const clearPostForm = () => {
    setUserImg('');
    setPlaceName('');
    setLocation('');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : -140}
      >
        {userImg ? (
          <View style={styles.imageBox}>
            <Image style={styles.uploadImg} source={{ uri: userImg }} />
            <TouchableOpacity
              style={[
                styles.cameraBox,
                { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
              ]}
            >
              <MaterialIcons name="photo-camera" size={24} color={'#FFFFFF'} />
            </TouchableOpacity>
          </View>
        ) : (
          <Camera style={styles.imageBox} type={type} ref={setCameraRef}>
            <View style={styles.uploadImg}>
              <TouchableOpacity
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    await MediaLibrary.createAssetAsync(uri);
                    setUserImg(uri);
                  }
                }}
                style={[styles.cameraBox, { backgroundColor: '#ffffff' }]}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={24}
                  color={'#BDBDBD'}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        )}

        <Text style={styles.imageBoxText}>
          {userImg ? (
            <Text onPress={() => setUserImg(null)}>Редагувати фото</Text>
          ) : (
            <Text onPress={takeGalleryPhoto}>Завантажте фото</Text>
          )}
        </Text>
        <Input
          value={placeName}
          onChangeText={setPlaceName}
          inputStyle={styles.placeNameInput}
          placeholder="Назва..."
          placeholderTextColor={'#BDBDBD'}
          inputContainerStyle={{ borderBottomColor: '#E8E8E8' }}
          placeholderStyle={{ fontSize: 16 }}
        />
        <Input
          value={location}
          onChangeText={setLocation}
          inputStyle={styles.locationInput}
          placeholder="Місцевість..."
          placeholderTextColor={'#BDBDBD'}
          inputContainerStyle={{ borderBottomColor: '#E8E8E8' }}
          placeholderStyle={{ fontSize: 16 }}
          leftIcon={<Feather name="map-pin" size={20} color="#BDBDBD" />}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                userImg && placeName && location ? '#FF6C00' : '#F6F6F6',
            },
          ]}
        >
          <Text
            style={[
              styles.buttonTextStyle,
              {
                color: userImg && placeName && location ? '#FFFFFF' : '#BDBDBD',
              },
            ]}
          >
            Опубліковати
          </Text>
        </TouchableOpacity>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={clearPostForm} style={styles.deleteBtnBox}>
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },

  imageBox: {
    position: 'relative',
    marginBottom: 8,
  },

  uploadImg: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },

  cameraBox: {
    position: 'absolute',
    top: 90,
    left: 165,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  imageBoxText: {
    marginBottom: 32,
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    color: '#BDBDBD',
  },

  placeNameInput: {
    paddingVertical: 15,
    fontFamily: 'RobotoMedium',
    fontSize: 16,
    color: '#212121',
  },

  locationInput: {
    paddingVertical: 15,
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    color: '#212121',
  },

  buttonStyle: {
    display: 'flex',
    marginHorizontal: 'auto',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 30,
  },

  buttonTextStyle: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
  },

  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },

  deleteBtnBox: {
    width: 70,
    height: 40,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreatePostsScreen;
