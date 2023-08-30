import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import bgi from '../image/BGImage.jpg';
import { TouchableWithoutFeedback } from 'react-native';

const LoginForm = () => {
  const [fontLoader, setfontLoader] = useState(false);
  const [activeInput, setActiveInput] = useState('');

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
      <View style={styles.loginContainer}>
        <ImageBackground
          source={bgi}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -120 : -140}
          >
            <View style={styles.formContainer}>
              <Text style={styles.screenTitle}>Увійти</Text>
              <View>
                <TextInput
                  onFocus={() => setActiveInput('email')}
                  onBlur={() => setActiveInput('')}
                  style={[
                    styles.inputStyle,
                    activeInput === 'email' && styles.isActiveInput,
                  ]}
                  type="email"
                  name="email"
                  placeholder="Адреса електронної пошти"
                />
                <View style={styles.passwordInput}>
                  <TextInput
                    onFocus={() => setActiveInput('password')}
                    onBlur={() => setActiveInput('')}
                    style={[
                      styles.inputStyle,
                      activeInput === 'password' && styles.isActiveInput,
                    ]}
                    autoCapitalize="none"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                  />
                  <TouchableOpacity style={styles.buttonShowPassword}>
                    <Text style={styles.showPasswordText}>Показати</Text>
                  </TouchableOpacity>
                </View>
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
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingBottom: 144,
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
  screenTitle: {
    paddingTop: 32,
    marginBottom: 32,
    textAlign: 'center',
    fontFamily: 'RobotoMedium',
    fontSize: 30,
    color: '#212121',
  },

  inputStyle: {
    marginHorizontal: 'auto',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: 'RobotoRegular',
    fontSize: 16,
  },

  isActiveInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF6C00',
  },

  passwordInput: {
    width: '100%',
    position: 'relative',
    paddingBottom: 43,
  },

  buttonShowPassword: {
    position: 'absolute',
    top: '25%',
    left: '75%',
  },

  showPasswordText: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    color: '#1B4371',
  },

  buttonStyle: {
    display: 'flex',
    marginHorizontal: 'auto',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 30,
    fontFamily: 'RobotoRegular',
    fontSize: 16,
  },

  toRegisterPage: {
    textAlign: 'center',
    color: '#1B4371',
    fontFamily: 'RobotoRegular',
    fontSize: 16,
  },
});

export default LoginForm;
