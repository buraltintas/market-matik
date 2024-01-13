import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useContext } from 'react';
import { ListContext } from '../store';
import { Video } from 'expo-av';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/Button';

const Welcome = ({ navigation }) => {
  const ctx = useContext(ListContext);

  const goToNewList = () => {
    navigation.navigate('CreateList');
  };

  const goToLists = () => {
    navigation.navigate('Lists');
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>MarketMatik</Text>
        <Text style={styles.infoText}>
          Alışverişlerinizi daha akıllı ve hesaplı bir şekilde yönetin!
        </Text>
      </View>
      <Video
        style={styles.videoStyle}
        source={require('../assets/video.mp4')}
        isLooping
        isMuted
        shouldPlay
      />
      <View style={styles.buttons}>
        <Button
          onPress={goToNewList}
          label={'Yeni Liste'}
          style={{ height: 48 }}
        />
        <Button
          onPress={goToLists}
          label={'Listelerim'}
          style={{ height: 48 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 120,
    zIndex: 9999,
  },
  title: {
    fontSize: 40,
    fontFamily: GlobalStyles.fonts.bold,
    color: GlobalStyles.colors.primary,
  },
  infoText: {
    padding: 24,
    fontSize: 24,
    fontFamily: GlobalStyles.fonts.semibold,
    textAlign: 'center',
  },
  videoStyle: {
    opacity: 0.3,
    aspectRatio: 0.57,
    height: Dimensions.get('screen').height,
  },
  buttons: {
    position: 'absolute',
    bottom: 180,
    gap: 16,
  },
});

export default Welcome;
