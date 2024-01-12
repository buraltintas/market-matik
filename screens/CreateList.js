import { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import Button from '../components/Button';
import ListItem from '../components/ListItem';
import { GlobalStyles } from '../constants/styles';
import { ListContext } from '../store';

const CreateList = () => {
  const { createNewList } = useContext(ListContext);
  const [list, setList] = useState([]);
  const [itemName, setItemName] = useState('');
  const [totalAmountValue, setTotalAmountValue] = useState(null);
  const [totalAmountText, setTotalAmountText] = useState('');
  const [error, setError] = useState(false);

  const onChangeNameHandler = (value) => {
    setItemName(value);
  };

  const addToList = () => {
    if (itemName.length < 1) {
      setError(false);
      return;
    }

    if (
      list.some((item) => item.name.toLowerCase() === itemName.toLowerCase())
    ) {
      setError(true);
      return;
    }

    const item = {
      name: itemName,
      price: null,
    };

    setList((prev) => [...prev, item]);
    setItemName('');
    setError(false);
  };

  const deleteItem = (name) => {
    const newList = list.filter(
      (item) => item.name.toLowerCase() !== name.toLowerCase()
    );
    setList(newList);
  };

  const createList = () => {
    const listData = {
      list,
      totalAmountValue,
      totalAmountText,
      createdDate: new Date(),
      marketDate: null,
      name: null,
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alışveriş Listeni Oluşturmaya Başla</Text>
      <View style={styles.addItemContainer}>
        <TextInput
          style={styles.listInput}
          onChangeText={onChangeNameHandler}
          value={itemName}
          placeholder='Ürün Adı'
        />
        <Button
          onPress={addToList}
          label={'Ekle'}
          disabled={itemName.length < 1}
        />
      </View>
      {error && <Text style={styles.errorText}>Bu ürün zaten listede!</Text>}
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.list}
          data={list}
          renderItem={({ item, index }) => (
            <ListItem
              name={item.name}
              onIconPress={() => deleteItem(item.name)}
              withDeleteIcon
              order={index + 1}
            />
          )}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>

      <View style={styles.footer}>
        <CurrencyInput
          value={totalAmountValue}
          onChangeValue={setTotalAmountValue}
          renderTextInput={(textInputProps) => (
            <TextInput
              {...textInputProps}
              style={styles.listInput}
              placeholder='Tahmini Tutar'
              keyboardType='numeric'
            />
          )}
          prefix='₺ '
          delimiter='.'
          separator=','
          precision={0}
          minValue={0}
          onChangeText={(formattedValue) => {
            setTotalAmountText(formattedValue);
          }}
        />
        <Button label={'Oluştur'} onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 16,
    fontFamily: GlobalStyles.fonts.semibold,
  },
  addItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  listInput: {
    height: 48,
    maxHeight: 48,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary,
    borderRadius: 8,
    padding: 10,
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontFamily: GlobalStyles.fonts.regular,
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  footer: {
    height: 160,
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: GlobalStyles.colors.secondary,
  },
});

export default CreateList;
