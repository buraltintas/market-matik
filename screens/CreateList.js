import { useContext, useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import uuid from 'react-native-uuid';
import CurrencyInput from 'react-native-currency-input';
import Button from '../components/Button';
import ListItem from '../components/ListItem';
import TitleText from '../components/TitleText';
import { GlobalStyles } from '../constants/styles';
import { ListContext } from '../store';

const CreateList = ({ navigation }) => {
  const flatListRef = useRef(null);
  const { updateLists } = useContext(ListContext);
  const [list, setList] = useState([]);
  const [itemName, setItemName] = useState('');
  const [totalAmountValue, setTotalAmountValue] = useState(null);
  const [totalAmountText, setTotalAmountText] = useState('');
  const [error, setError] = useState(false);

  const goToLists = () => {
    navigation.navigate('Lists');
  };

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
      priceValue: null,
      priceText: null,
    };

    setList((prev) => [...prev, item]);
    setItemName('');
    setError(false);
    setTimeout(() => {
      flatListRef.current.scrollToEnd();
    }, 100);
  };

  const deleteItem = (name) => {
    const newList = list.filter(
      (item) => item.name.toLowerCase() !== name.toLowerCase()
    );
    setList(newList);
  };

  const createList = () => {
    const listData = {
      id: uuid.v4(),
      list,
      totalAmountValue,
      totalAmountText,
      createdDate: new Date(),
      marketDate: null,
      marketName: null,
      isDone: false,
    };

    updateLists(listData);
    goToLists();
  };

  return (
    <View style={styles.container}>
      <TitleText text={'Alışveriş Listeni Oluşturmaya Başla'} />
      <View style={styles.addItemContainer}>
        <TextInput
          style={styles.listInput}
          onChangeText={onChangeNameHandler}
          value={itemName}
          placeholder='Ürün Adı'
          enterKeyHint='enter'
          onSubmitEditing={() => addToList()}
          blurOnSubmit={false}
        />
        <Button
          onPress={addToList}
          label={'Ekle'}
          disabled={itemName.length < 1}
          style={{ height: 48 }}
        />
      </View>
      {error && <Text style={styles.errorText}>Bu ürün zaten listede!</Text>}
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          style={styles.list}
          data={list}
          renderItem={({ item, index }) => (
            <ListItem
              item={item}
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
        <Button
          label={'Oluştur'}
          onPress={createList}
          disabled={list.length < 1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
    borderBottomWidth: 1,
    borderColor: GlobalStyles.colors.primary,
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
    borderTopWidth: 1,
    borderColor: GlobalStyles.colors.primary,
    height: 160,
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 16,
    backgroundColor: GlobalStyles.colors.secondary,
  },
});

export default CreateList;
