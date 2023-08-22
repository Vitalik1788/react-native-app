// import { StatusBar } from 'expo-status-bar';
import { useFonts } from "expo-font";
import RegistrationForm from './src/screens/RegistrationScreen';
import LoginForm from "./src/screens/LoginScreen";




export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto": require("./assets/fonts/RobotoMedium.ttf"),
  });


  return (
    <>
      {/* <RegistrationForm /> */}
      <LoginForm />
    </>
  );
}



