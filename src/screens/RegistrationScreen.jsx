import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';

import defaultImage from '../../assets/image/default.jpg';
import bgi from '../../assets/image/BGI2x.jpg';
import { AntDesign } from '@expo/vector-icons';

const RegistrationForm = () => {
  const [activeInput, setActiveInput] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  const [securePassword, setSecurePassword] = useState(true);
  const [inputs, setInputs] = useState({
    login: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({...prevState, [input]: text}))
  }

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({...prevState, [input]: errorMessage}));
  };

  

  const handleSubmitForm = () => {

    if (!inputs.login) {
      handleError("Будь ласка вкажіть Логін", 'login');
      return;
    } else if (inputs.login.length <= 2) {
      handleError('Логін має містити більше 2х символів', 'login');
      return;
    }

    if (!inputs.email) {
      handleError('Будь ласка вкажіть email', 'email');
      return;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Неправильна адреса електронної пошти', 'email');
      return;
    }

    if (!inputs.password) {
      handleError('Будь ласка вкажіть пароль', 'password');
      return;
    } else if (inputs.password.length < 5) {
      handleError('Мінімальна довжина паролю 5 символів', 'password');
      return;
    }

  
    const user = {
      login: inputs.login,
      email: inputs.email,
      password: inputs.password
    };

    setInputs({ login: '', email: '', password: '' });
    
    navigation.navigate('Home');
  };  


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.registerContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -170 : -140}
      >
        <ImageBackground
          source={bgi}
          resizeMode="cover"
          style={styles.imageBackground}
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
              <View style={{ marginBottom: 11 }}>
                <TextInput
                  textContentType="username"
                  autoCorrect={false}
                  autoComplete="off"
                  onFocus={() => {
                    setActiveInput('login'),
                    handleError(null, 'login')
                  }}
                  onBlur={() => setActiveInput('')}
                  onChangeText={text => handleOnChange(text, 'login')}
                  value={inputs.login}
                  style={[
                    styles.inputStyle,
                    activeInput === 'login' && styles.isActiveInput,
                  ]}
                  placeholder="Логін"
                />
                {errors && (
                  <Text style={{ color: 'red' }}>{errors.login}</Text>
                )}
              </View>

              <View style={{ marginBottom: 11 }}>
                <TextInput
                  textContentType="emailAddress"
                  autoCorrect={false}
                  autoComplete="off"
                  onFocus={() => { setActiveInput('email'), handleError(null, 'email') }}
                  onBlur={() => setActiveInput('')}
                  onChangeText={text => handleOnChange(text, 'email')}
                  value={inputs.email}
                  style={[
                    styles.inputStyle,
                    activeInput === 'email' && styles.isActiveInput,
                  ]}
                  placeholder="Адреса електронної пошти"
                />
                {errors && (
                  <Text style={{ color: 'red' }}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.passwordInput}>
                <TextInput
                  textContentType="password"
                  onFocus={() => { setActiveInput('password'), handleError(null, 'password')}}
                  onBlur={() => setActiveInput('')}
                  onChangeText={text => handleOnChange(text, 'password')}
                  value={inputs.password}
                  style={[
                    styles.inputStyle,
                    activeInput === 'password' && styles.isActiveInput,
                  ]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="off"
                  secureTextEntry={securePassword && true}
                  placeholder="Пароль"
                />
                {errors && (
                  <Text style={{ color: 'red' }}>{errors.password}</Text>
                )}
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
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
                  Зареєструватися
                </Text>
              </TouchableOpacity>
              <Text
                style={styles.toLoginPage}
                onPress={() => navigation.navigate('Login')}
              >
                Вже є акаунт? Увійти
              </Text>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
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
    marginBottom: 5,
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
    paddingBottom: 45,
    textAlign: 'center',
    color: '#1B4371',
    fontFamily: 'RobotoRegular',
    fontSize: 16,
  },
});

export default RegistrationForm;
