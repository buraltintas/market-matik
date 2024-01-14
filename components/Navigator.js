import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
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
          options={({ navigation }) => ({
            title: 'Yeni Alışveriş Listesi',
            headerRight: () => (
              <Ionicons
                name='list-circle-outline'
                size={24}
                color='#777'
                onPress={() => navigation.navigate('Lists')}
              />
            ),
          })}
        />
        <Stack.Screen
          name='MarketList'
          component={MarketList}
          options={{
            title: 'Alışveriş Listesi',
          }}
        />
        <Stack.Screen
          name='Lists'
          component={Lists}
          options={({ navigation }) => ({
            title: 'Listelerim',
            headerRight: () => (
              <Ionicons
                name='add-circle-outline'
                size={24}
                color='#777'
                onPress={() => navigation.navigate('CreateList')}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
