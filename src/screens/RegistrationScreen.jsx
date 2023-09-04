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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import defaultImage from '../image/default.jpg';
import bgi from '../image/BGImage.jpg';
import { AntDesign } from '@expo/vector-icons';

const RegistrationForm = () => {
  const [fontLoader, setfontLoader] = useState(false);
  const [activeInput, setActiveInput] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  const [securePassword, setSecurePassword] = useState(true);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleSubmitForm = () => {
    if (!login || !email || !password) return console.warn('Будь-ласка заповніть всі поля');
    const user = {
      login,
      email,
      password,
    };
    console.log(user);

    setLogin('');
    setEmail('');
    setPassword('');
  };  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.registerContainer}>
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
              <View style={styles.avatarContainer}>
                <Image
                  source={userAvatar ? { uri: userAvatar } : defaultImage}
                  style={styles.imageStyle}
                />
                <View>
                  {!userAvatar ? (
                    <TouchableOpacity>
                      <AntDesign
                        name="pluscircleo"
                        size={25}
                        color="#FF6C00"
                        style={styles.avatarAddButton}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setUserAvatar(null)}>
                      <AntDesign
                        name="closecircleo"
                        size={24}
                        color="#BDBDBD"
                        style={styles.avatarAddButton}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <Text style={styles.screenTitle}>Реєстрація</Text>
              <View>
                <TextInput
                  onFocus={() => setActiveInput('login')}
                  onBlur={() => setActiveInput('')}
                  onChangeText={setLogin}
                  value={login}
                  style={[
                    styles.inputStyle,
                    activeInput === 'login' && styles.isActiveInput,
                  ]}
                  type="text"
                  name="login"
                  placeholder="Логін"
                />
                <TextInput
                  onFocus={() => setActiveInput('email')}
                  onBlur={() => setActiveInput('')}
                  onChangeText={setEmail}
                  value={email}
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
                    onChangeText={setPassword}
                    value={password}
                    style={[
                      styles.inputStyle,
                      activeInput === 'password' && styles.isActiveInput,
                    ]}
                    autoCapitalize="none"
                    secureTextEntry={securePassword && true}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                  />
                  <TouchableOpacity
                    style={styles.buttonShowPassword}
                    onPress={() => setSecurePassword(prev => !prev)}
                  >
                    <Text style={styles.showPasswordText}>
                      {securePassword ? 'Показати' : 'Приховати'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={handleSubmitForm}
                >
                  <Text style={{ color: '#FFFFFF' }}>Зареєструватися</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.toLoginPage}>Вже є акаунт? Увійти</Text>
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
  registerContainer: {
    flex: 1,
    paddingBottom: 45,
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
    top: 15,
    left: 47,
  },

  screenTitle: {
    marginTop: 92,
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
    marginBottom: 43,
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

  toLoginPage: {
    textAlign: 'center',
    color: '#1B4371',
    fontFamily: 'RobotoRegular',
    fontSize: 16,
  },
});

export default RegistrationForm;
