import { Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/styles';

const TitleText = (props) => {
  return <Text style={styles.title}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 16,
    fontFamily: GlobalStyles.fonts.semibold,
  },
});

export default TitleText;
