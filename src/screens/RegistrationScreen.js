import defaultImage from "../image/default.jpg";
import bgi from "../image/BGImage.jpg";
import { AntDesign } from "@expo/vector-icons";

import {
  View,
  TextInput,
  Text,  
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  } from "react-native";


const RegistrationForm = () => { 

  return (
    <View style={styles.registerContainer}>
      <ImageBackground
        source={bgi}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.formContainer}>
          <Image source={defaultImage} style={styles.imageStyle}/>
          <AntDesign
            name="pluscircleo"
            size={25}
            color="#FF6C00"
            style={styles.avatarAddButton}
          />
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
          </View>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={{color:"#FFFFFF"}}>
              Зареєструватися
            </Text>
          </TouchableOpacity>
          <Text style={styles.toLoginPage}>
            Вже є акаунт? Увійти
          </Text>
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
    left: 253,
    top: 20,
  },

  screenTitle: {
    marginTop: 92,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "bold",
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
    fontFamily: "Roboto",
    fontSize: 16,
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
    fontSize: 16,
  },
  
  toLoginPage: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
  }
});

export default RegistrationForm;