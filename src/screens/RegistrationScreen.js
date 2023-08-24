import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import defaultImage from "../image/default.jpg";
import bgi from "../image/BGImage.jpg";
import { AntDesign } from "@expo/vector-icons";




const RegistrationForm = () => { 
  const [fontLoader, setfontLoader] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync(
        {
          RobotoMedium: require("../../assets/fonts/RobotoMedium.ttf"),
          RobotoRegular: require("../../assets/fonts/RobotoRegular.ttf"),
        }
      );
      setfontLoader(true)}
    loadFont()}, []);

  if (!fontLoader) { return null };

  return (
    <View style={styles.registerContainer}>
      <ImageBackground
        source={bgi}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.formContainer}>
          <Image source={defaultImage} style={styles.imageStyle} />
          <TouchableOpacity>
            <AntDesign
            name="pluscircleo"
            size={25}
            color="#FF6C00"
            style={styles.avatarAddButton}
          />
          </TouchableOpacity>          
          <Text style={styles.screenTitle}>Реєстрація</Text>
          <View>
            <TextInput
              style={styles.loginInputStyle}
              type="text"
              name="login"
              placeholder="Логін"
            />
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
          </View>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={{color:"#FFFFFF"}}>
              Зареєструватися
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.toLoginPage}>
              Вже є акаунт? Увійти
            </Text>
          </TouchableOpacity>          
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    paddingBottom: 45,
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

  imageStyle: {
    position: "absolute",
    left: 145,
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  avatarAddButton: {
    position: "absolute",
    left: 251,
    top: 20,
  },

  screenTitle: {
    marginTop: 92,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "RobotoMedium",
    fontSize: 30,
    color: "#212121",
  },

  loginInputStyle: {
    position:"relative",
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
    top: 156,
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
    paddingLeft: 112,
    paddingRight: 112,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 30,
    fontFamily: "RobotoRegular",
    fontSize: 16,
  },
  
  toLoginPage: {
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "RobotoRegular",
    fontSize: 16,
  }
});

export default RegistrationForm;