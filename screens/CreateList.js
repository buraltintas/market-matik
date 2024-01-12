import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import Button from '../components/Button';
import ListItem from '../components/ListItem';
import { GlobalStyles } from '../constants/styles';

const CreateList = () => {
  const [list, setList] = useState([]);
  const [itemName, setItemName] = useState('');
  const [error, setError] = useState(false);

  const onChangeHandler = (value) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alışveriş Listeni Oluşturmaya Başla</Text>
      <View style={styles.addItemContainer}>
        <TextInput
          style={styles.listInput}
          onChangeText={onChangeHandler}
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
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <View style={styles.footerButton}>
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
  footerButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: GlobalStyles.colors.secondary,
  },
});

export default CreateList;
