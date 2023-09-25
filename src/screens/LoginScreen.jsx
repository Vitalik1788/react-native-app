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
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import bgi from '../../assets/image/BGI2x.jpg';

const LoginForm = () => {
  const [fontLoader, setfontLoader] = useState(false);
  const [activeInput, setActiveInput] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();


  useEffect(() => {
    async function loadFont() {
      try {
        await Font.loadAsync({
        RobotoMedium: require('../../assets/fonts/RobotoMedium.ttf'),
        RobotoRegular: require('../../assets/fonts/RobotoRegular.ttf'),
      });
      setfontLoader(true);
      } catch (error) {
        console.log(e
        )
      }      
    }
    loadFont();
  }, []);

  if (!fontLoader) {
    return null;
  }

  const handleSubmitForm = () => {
    if (!email || !password)
      return console.warn('Будь-ласка заповніть всі поля');
    const user = {
      email,
      password,
    };
    console.log(user);

    setEmail('');
    setPassword('');

    navigation.navigate('Home');

  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.loginContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -260 : -140}
      >
        <ImageBackground
          source={bgi}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.formContainer}>
            <Text style={styles.screenTitle}>Увійти</Text>
            <View>
              <TextInput
                autoCorrect={false}
                autoComplete="off"
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
                  autoCorrect={false}
                  autoComplete="off"
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
                <Text style={{ color: '#FFFFFF', fontSize: 16, }}>Увійти</Text>
              </TouchableOpacity>
              <Text style={styles.toRegisterPage} onPress={() => navigation.navigate('Registration')}>
                Немає акаунту? Зареєструватися          
              </Text>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'flex-end',
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
    paddingBottom: 144,
    textAlign: 'center',
    color: '#1B4371',
    fontFamily: 'RobotoRegular',
    fontSize: 16,
  },
});

export default LoginForm;
