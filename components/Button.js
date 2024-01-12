import { Text, Pressable, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/styles';

const Button = (props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
        props.style,
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text style={styles.buttonText}>{props.label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    zIndex: 9999,
    borderColor: GlobalStyles.colors.primary,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.secondary,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontFamily: GlobalStyles.fonts.medium,
    textAlign: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});

export default Button;
