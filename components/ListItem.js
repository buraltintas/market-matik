import { Text, View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles } from '../constants/styles';

const ListItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.order}>{props.order}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {props.name}
        </Text>
      </View>
      <View>
        {props.price && <Text>{props.price}</Text>}
        {props.withDeleteIcon && (
          <Ionicons
            name='trash-outline'
            size={24}
            color='#777'
            onPress={props.onIconPress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    borderColor: GlobalStyles.colors.primary,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  order: {
    fontFamily: GlobalStyles.fonts.regular,
    fontSize: 16,
    color: GlobalStyles.colors.primary,
  },
  name: {
    fontFamily: GlobalStyles.fonts.medium,
    fontSize: 20,
    maxWidth: '85%',
  },
});

export default ListItem;
