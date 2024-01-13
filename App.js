import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import ListProvider from './store';
import Navigator from './components/Navigator';
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';

export default function App() {
  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  console.log('fontsLoaded ->', fontsLoaded);

  if (!fontsLoaded) {
    SplashScreen.hideAsync();
  }

  return (
    <>
      {fontsLoaded && (
        <ListProvider>
          <StatusBar style='auto' />
          <SafeAreaProvider>
            <Navigator />
          </SafeAreaProvider>
        </ListProvider>
      )}
    </>
  );
}
