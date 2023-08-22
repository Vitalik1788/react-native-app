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

  return (
    <View style={styles.loginContainer}>
      <ImageBackground
        source={bgi}
        resizeMode="cover"
        style={styles.imageBackground}>
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
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={{color:"#FFFFFF"}}>
              Увійти
              </Text>
            </TouchableOpacity>
            <Text style={styles.toRegisterPage}>
            Немає акаунту? Зареєструватися
          </Text>
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
    fontSize: 16,
  }
})

export default LoginForm;