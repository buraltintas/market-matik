import { Text, View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useContext } from 'react';
import { ListContext } from '../store';
import { Video } from 'expo-av';
import { GlobalStyles } from '../constants/styles';

const Welcome = ({ navigation }) => {
  const ctx = useContext(ListContext);

  const startHandler = () => {
    navigation.navigate('CreateList');
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
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={startHandler}
      >
        <Text style={styles.buttonText}>Başla!</Text>
      </Pressable>
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
  button: {
    position: 'absolute',
    bottom: 120,
    zIndex: 9999,
    borderColor: GlobalStyles.colors.primary,
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: GlobalStyles.colors.secondary,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: GlobalStyles.fonts.medium,
  },
  buttonPressed: {
    opacity: 0.7,
  },
});

export default Welcome;
