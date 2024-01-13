import { Text, View, StyleSheet, TextInput } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles } from '../constants/styles';

const ListItem = (props) => {
  console.log('props ->', props);
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.order}>{props.order}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {props.item.name}
        </Text>
      </View>
      <View style={styles.priceIconContainer}>
        {props.withAmountInput && (
          <CurrencyInput
            value={props.item.priceValue}
            onChangeValue={props.amountValueHandler}
            renderTextInput={(textInputProps) => (
              <TextInput
                {...textInputProps}
                style={styles.priceInput}
                placeholder='Fiyat'
                keyboardType='numeric'
              />
            )}
            prefix='₺ '
            delimiter='.'
            separator=','
            precision={0}
            minValue={0}
            onChangeText={(formattedValue) => {
              props.amountTextHandler(formattedValue);
            }}
          />
        )}
        {props.withDeleteIcon && (
          <Ionicons
            name='trash-outline'
            size={24}
            color='#E5595F'
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
  priceIconContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
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
  priceInput: {
    height: 36,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary,
    borderRadius: 8,
    padding: 10,
    width: 80,
  },
});

export default ListItem;
