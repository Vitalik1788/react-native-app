import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,  
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '@rneui/themed';

const CreatePostsScreen = () => {
  const [fontLoader, setfontLoader] = useState(false);
  const [userImg, setUserImg] = useState(null);

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
      <View style={styles.container}>
        <View style={styles.imageBox}>
          <Image style={styles.uploadImg} />
          <TouchableOpacity style={styles.cameraBox}>
            <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.imageBoxText}>
            {userImg ? 'Редагувати фото' : 'Завантажте фото'}
          </Text>
        </View>
        <Input
          style={styles.inputStyle}
          placeholder="Назва..."
          placeholderTextColor={'#BDBDBD'}
          inputContainerStyle={{ borderBottomColor: '#E8E8E8' }}
          placeholderStyle={{ fontSize: 16 }}
        />
        <Input
          style={styles.inputStyle}
          placeholder="Місцевість..."
          placeholderTextColor={'#BDBDBD'}
          inputContainerStyle={{ borderBottomColor: '#E8E8E8' }}
          placeholderStyle={{ fontSize: 16 }}
        />
      </View>
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
    backgroundColor: '#ffffff',
    borderRadius: 50,
  },

  imageBoxText: {
    marginBottom: 32,
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    color: '#BDBDBD',
  },

  inputStyle: {
    paddingVertical: 15,
    fontFamily: 'RobotoMedium',
    fontSize: 16,
  },
});

export default CreatePostsScreen;
