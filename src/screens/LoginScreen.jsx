import React, { useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/auth/authOperation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const LoginForm = () => {
  const [activeInput, setActiveInput] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({}); 
  

  const navigation = useNavigation();  
  const dispatch = useDispatch();  

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  const handleSubmitForm = async () => { 
    
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
    
    const { email, password } = inputs;

    dispatch(login({ email, password }));    
    
   onAuthStateChanged(auth, (user) => {
      if (user) {
        setInputs({ email: '', password: '' });
        navigation.navigate('Home');
        return;
      } 
   })    
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
              <View style={{marginBottom:11}}>
                <TextInput
                  textContentType="emailAddress"
                  autoCorrect={false}
                  autoComplete="off"
                  onFocus={() => {
                    setActiveInput('email'), handleError(null, 'email');
                  }}
                  onBlur={() => setActiveInput('')}
                  onChangeText={text => handleOnChange(text, 'email')}
                  value={inputs.email}
                  style={[
                    styles.inputStyle,
                    activeInput === 'email' && styles.isActiveInput,
                  ]}
                  placeholder="Адреса електронної пошти"
                />
                {errors && <Text style={{ color: 'red' }}>{errors.email}</Text>}
              </View>

              <View style={styles.passwordInput}>
                <TextInput
                  textContentType="password"
                  onFocus={() => {
                    setActiveInput('password'), handleError(null, 'password');
                  }}
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
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Увійти</Text>
              </TouchableOpacity>
              <Text
                style={styles.toRegisterPage}
                onPress={() => navigation.navigate('Registration')}
              >
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
