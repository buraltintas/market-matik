import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../screens/Welcome';
import MarketList from '../screens/MarketList';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#FFF6ED' },
          headerTintColor: 'black',
          contentStyle: { backgroundColor: '#FFF6ED' },
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
