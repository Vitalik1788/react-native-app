import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import bgi from "../image/BGImage.jpg";


const LoginForm = () => {
  const [fontLoader, setfontLoader] = useState(false);

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

  if (!fontLoader) { return null }; 

  return (
    <View style={styles.loginContainer}>
      <ImageBackground
        source={bgi}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.formContainer}>
          <Text style={styles.screenTitle}>Увійти</Text>
          <View>
            <TextInput
              style={styles.loginInputStyle}
              type="email"
              name="email"
              placeholder="Адреса електронної пошти"
            />
            <TextInput
              style={styles.loginInputStyle}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <TouchableOpacity style={styles.buttonShowPassword}>
              <Text style={styles.showPasswordText}>Показати</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={{ color: '#FFFFFF' }}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.toRegisterPage}>
                Немає акаунту? Зареєструватися
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingBottom: 144,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formContainer: {
    backgroundColor: "white",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  screenTitle: {
    paddingTop: 32,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "RobotoMedium",
    fontSize: 30,
    color: "#212121",
  },
  loginInputStyle: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 343,
    marginBottom: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: "RobotoRegular",
    fontSize: 16,
  },
  buttonShowPassword: {
    position: "absolute",
    top: 85,
    left: 290,
  },
  showPasswordText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: "#1B4371",
  },
  buttonStyle: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 343,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 147,
    paddingRight: 147,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 30,
    fontSize: 16,
  },
  toRegisterPage: {
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "RobotoRegular",
    fontSize: 16,
  }
})

export default LoginForm;