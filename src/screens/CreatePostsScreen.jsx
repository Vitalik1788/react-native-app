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
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Input } from 'react-native-elements';

const CreatePostsScreen = () => {
  const [fontLoader, setfontLoader] = useState(false);
  const [placeName, setPlaceName] = useState(null);
  const [location, setLocation] = useState(null);
  const [userImg, setUserImg] = useState(
    require('../../assets/image/postsImg.jpg')
  );

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -100 : -140}
      >
        <View style={styles.imageBox}>
          <Image style={styles.uploadImg} source={userImg} />
          <TouchableOpacity
            style={[
              styles.cameraBox,
              {
                backgroundColor: userImg
                  ? 'rgba(255, 255, 255, 0.3)'
                  : '#ffffff',
              },
            ]}
          >
            <MaterialIcons
              name="photo-camera"
              size={24}
              color={userImg ? '#FFFFFF' : '#BDBDBD'}
            />
          </TouchableOpacity>
          <Text style={styles.imageBoxText}>
            {userImg ? 'Редагувати фото' : 'Завантажте фото'}
          </Text>
        </View>
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
            Опубліковати{' '}
          </Text>
        </TouchableOpacity>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.deleteBtnBox}>
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
  },

  uploadImg: {
    width: '100%',
    height: 240,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    marginBottom: 8,
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
