import { useContext, useEffect, useRef, useState } from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import Ionicons from '@expo/vector-icons/Ionicons';
import TitleText from '../components/TitleText';
import Button from '../components/Button';
import ListItem from '../components/ListItem';
import { ListContext } from '../store';
import { GlobalStyles } from '../constants/styles';

const MarketList = ({ route, navigation }) => {
  const flatListRef = useRef(null);
  const { getSelectedList, updateList, finishList } = useContext(ListContext);
  const [listData, setListData] = useState({
    list: [],
  });
  const [itemName, setItemName] = useState('');
  const [error, setError] = useState(false);
  const [isAmountEditing, setIsAmountEditing] = useState(false);

  useEffect(() => {
    setListData(getSelectedList(route.params.id));
  }, []);

  const onChangeNameHandler = (value) => {
    setListData((prev) => ({
      ...prev,
      marketName: value,
    }));
  };

  const setTotalAmountValue = (value) => {
    setListData((prev) => ({
      ...prev,
      totalAmountValue: value,
    }));
  };

  const setTotalAmountText = (value) => {
    setListData((prev) => ({
      ...prev,
      totalAmountText: value,
    }));
  };

  const addToList = () => {
    if (itemName.length < 1) {
      setError(false);
      return;
    }

    if (
      listData.list.some(
        (item) => item.name.toLowerCase() === itemName.toLowerCase()
      )
    ) {
      setError(true);
      return;
    }

    const item = {
      name: itemName,
      priceValue: null,
      priceText: null,
    };

    setListData((prev) => ({
      ...prev,
      list: [...prev.list, item],
    }));
    setItemName('');
    setError(false);

    setTimeout(() => {
      flatListRef.current.scrollToEnd();
    }, 100);
  };

  const onItemAmountChangeHandler = (index, amount, type) => {
    const newList = listData.list.map((item, i) => {
      if (index === i && amount > -1) {
        item[type] = amount;
      }
      return item;
    });

    setListData((prev) => ({
      ...prev,
      list: newList,
    }));
  };

  const deleteItem = (index) => {
    const newList = listData.list.filter((item, i) => i !== index);

    setListData((prev) => ({
      ...prev,
      list: newList,
    }));
  };

  const updateCurrentList = () => {
    updateList(route.params.id, listData);
    Alert.alert('Liste başarıyla güncellendi!');
    navigation.navigate('Lists');
  };

  const finishCurrentList = () => {
    Alert.alert('Alışverişi Tamamlıyorsunuz!', 'Bu işlem geri alınamaz!', [
      {
        text: 'Vazgeç',
        style: 'cancel',
      },
      {
        text: 'Tamamla!',
        onPress: () => {
          finishList(route.params.id, listData);
          navigation.navigate('Lists');
        },
      },
    ]);
  };

  if (listData.list.length < 1) return null;

  return (
    <View style={styles.container}>
      <TitleText text='Alışverişinizi Tamamlayın' />

      <View style={styles.marketNameContainer}>
        <Text style={styles.marketNameLabel}>Market Adı:</Text>
        <TextInput
          style={styles.marketNameInput}
          onChangeText={onChangeNameHandler}
          value={listData.marketName}
        />
      </View>

      <View style={styles.amountContainer}>
        <View style={styles.amountTextContainer}>
          <Text style={styles.amountLabel}>Belirlediğin Tutar:</Text>
          {isAmountEditing ? (
            <CurrencyInput
              value={listData.totalAmountValue}
              onChangeValue={setTotalAmountValue}
              renderTextInput={(textInputProps) => (
                <TextInput
                  {...textInputProps}
                  style={styles.marketNameInput}
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
          ) : (
            <Text style={styles.amountText}>
              {listData.totalAmountText || '0'}
            </Text>
          )}
        </View>
        <View style={styles.iconContainer}>
          <Ionicons
            name={isAmountEditing ? 'checkmark' : 'pencil'}
            size={24}
            color='#444'
            onPress={() => setIsAmountEditing(!isAmountEditing)}
          />
        </View>
      </View>

      <View style={styles.addItemContainer}>
        <TextInput
          style={styles.marketNameInput}
          onChangeText={setItemName}
          value={itemName}
          placeholder='Ürün Adı'
          enterKeyHint='enter'
          onSubmitEditing={() => addToList()}
        />
        <Button
          onPress={addToList}
          label={'Ekle'}
          disabled={itemName.length < 1}
          style={{ height: 36 }}
        />
      </View>
      {error && <Text style={styles.errorText}>Bu ürün zaten listede!</Text>}

      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          style={styles.list}
          data={listData.list}
          renderItem={({ item, index }) => (
            <ListItem
              item={item}
              onIconPress={() => deleteItem(index)}
              amountValueHandler={(amount) =>
                onItemAmountChangeHandler(index, amount, 'priceValue')
              }
              amountTextHandler={(text) =>
                onItemAmountChangeHandler(index, text, 'priceText')
              }
              amountValue={item.priceValue}
              withAmountInput
              withDeleteIcon
              order={index + 1}
            />
          )}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>

      <View style={styles.footer}>
        <Text>Sepetteki Tutar: 350</Text>
        <View style={styles.buttons}>
          <Button
            label={'Güncelle'}
            style={{ flex: 1 }}
            onPress={updateCurrentList}
          />
          <Button
            label={'Tamamla'}
            style={{ flex: 1, backgroundColor: '#d7e4c7' }}
            onPress={finishCurrentList}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marketNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  marketNameLabel: {
    fontFamily: GlobalStyles.fonts.medium,
    fontSize: 16,
  },
  marketNameInput: {
    height: 36,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary,
    borderRadius: 8,
    padding: 10,
    flex: 1,
  },
  amountContainer: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  amountTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
    borderBottomWidth: 1,
    borderColor: GlobalStyles.colors.primary,
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
    height: 120,
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: GlobalStyles.colors.secondary,
  },
  buttons: {
    flexDirection: 'row',
    gap: 16,
  },
});

export default MarketList;
