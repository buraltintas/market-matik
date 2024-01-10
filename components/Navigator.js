import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GlobalStyles } from '../constants/styles';
import Welcome from '../screens/Welcome';
import MarketList from '../screens/MarketList';
import CreateList from '../screens/CreateList';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.secondary },
          headerTintColor: 'black',
          contentStyle: { backgroundColor: GlobalStyles.colors.secondary },
        }}
      >
        <Stack.Screen
          name='Welcome'
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='CreateList'
          component={CreateList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='MarketList'
          component={MarketList}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
