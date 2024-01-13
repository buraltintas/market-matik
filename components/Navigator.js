import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GlobalStyles } from '../constants/styles';
import Welcome from '../screens/Welcome';
import MarketList from '../screens/MarketList';
import CreateList from '../screens/CreateList';
import Lists from '../screens/Lists';

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
            title: 'Yeni Alışveriş Listesi',
          }}
        />
        <Stack.Screen
          name='MarketList'
          component={MarketList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Lists'
          component={Lists}
          options={{
            title: 'Listelerim',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
