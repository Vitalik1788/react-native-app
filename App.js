// import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { useFonts } from "expo-font";
import RegistrationForm from './src/screens/RegistrationScreen';
import LoginForm from "./src/screens/LoginScreen";




export default function App () {
  const [fontsLoaded] = useFonts({
    "RobotoMedium": require("./assets/fonts/RobotoMedium.ttf"),
    "RobotoRegular": require("./assets/fonts/RobotoRegular.ttf"),
  });


  return (
    <>
      <RegistrationForm />
      {/* <LoginForm /> */}
    </>
  );
}



