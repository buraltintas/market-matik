import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateList = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Create list page</Text>
        <Pressable onPress={() => navigation.navigate('Welcome')}>
          <Text>Geri!</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CreateList;
