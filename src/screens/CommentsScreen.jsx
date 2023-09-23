import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import forest from '../../assets/image/forest.jpg';

const CommentsScreen = () => {
  const [fontLoader, setfontLoader] = useState(false);
  const [text, setText] = useState(null);

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
    <View style={styles.container}>
      <Image source={forest} style={styles.postImageStyle} />
      <View style={styles.postBox}>
        <Image
          style={styles.commentUserImage}
          source={require('../../assets/image/commentUserImage.jpg')}
        />
        <View style={styles.commentTextBox}>
          <Text style={styles.commentText}>
            Really love your most recent photo. I’ve been trying to capture the
            same thing for a few months and would love some tips!
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Коментувати..."
          style={styles.inputStyle}
        />
        <TouchableOpacity style={styles.sendButton}>
        <AntDesign name="arrowup" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  postImageStyle: {
    marginVertical: 32,
    width: '100%',
    height: 240,
    borderRadius: 8,
  },

  postBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  commentUserImage: {
    width: 28,
    height: 28,
  },

  commentTextBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginLeft: 16,
    borderRadius: '6px, 0px, 6px, 6px',
  },

  commentText: {
    fontFamily: 'RobotoRegular',
    fontSize: 13,
  },

  inputContainer: {
    position: "relative",
    marginTop: 'auto',
    paddingBottom: 16,
  },

  inputStyle: {
    fontSize: 16,
    fontWeight: 500,
    paddingLeft: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(232, 232, 232, 1)',
  },

  sendButton: {
    position: "absolute",
    top: 10,
    left: 340,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: '#FF6C00',
  },
});

export default CommentsScreen;
