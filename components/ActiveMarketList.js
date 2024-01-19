import { useContext, useEffect, useRef, useState } from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import TitleText from '../components/TitleText';
import Button from '../components/Button';
import ListItem from '../components/ListItem';
import { GlobalStyles } from '../constants/styles';
import { ListContext } from '../store';

const ActiveMarketList = (props) => {
  const flatListRef = useRef(null);
  const { updateList, finishList } = useContext(ListContext);
  const [listData, setListData] = useState(props.listData);
  const [itemName, setItemName] = useState('');
  const [error, setError] = useState(false);
  const [isAmountEditing, setIsAmountEditing] = useState(false);
  const [totalSpent, setTotalSpent] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (listData.list) setTotalSpent(calculateTotalSpent());
  }, [listData.list]);

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

  const calculateTotalSpent = () => {
    let sum = 0;

    listData.list.forEach((l) => {
      sum += +l.priceValue;
    });

    return sum;
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
      if (index === i) {
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
    updateList(props.id, listData);
    Alert.alert('Liste başarıyla güncellendi!');
    props.navigation.navigate('Lists');
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
          finishList(props.id, listData);
          props.navigation.navigate('Lists');
        },
      },
    ]);
  };

  if (listData.list.length < 1) return null;

  console.log('Keyboard ->', keyboardVisible);

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
          <Text style={styles.amountLabel}>Belirlediğin Hedef Tutar:</Text>
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
          {isAmountEditing ? (
            <Ionicons
              name='checkmark'
              size={24}
              color='#444'
              onPress={() => setIsAmountEditing(!isAmountEditing)}
            />
          ) : (
            <Feather
              name='edit'
              size={24}
              color='#444'
              onPress={() => setIsAmountEditing(!isAmountEditing)}
            />
          )}
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
          removeClippedSubviews={false}
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

      {!keyboardVisible && (
        <View style={styles.footer}>
          {totalSpent > 0 && (
            <Text style={styles.totalSpentText}>
              Sepetteki Toplam Tutar: ₺ {totalSpent.toLocaleString('tr-TR')}
            </Text>
          )}
          {totalSpent > 0 && listData.totalAmountValue > 0 && (
            <View style={styles.spentContainer}>
              <Ionicons
                name={
                  totalSpent > +listData.totalAmountValue
                    ? 'close-circle-sharp'
                    : 'checkmark-circle-sharp'
                }
                size={16}
                color={
                  totalSpent > +listData.totalAmountValue
                    ? '#E5595F'
                    : '#69D07E'
                }
              />
              <Text style={styles.totalSpentText}>
                Hedefinden ₺{' '}
                {Math.abs(
                  totalSpent - +listData.totalAmountValue
                ).toLocaleString('tr-TR')}{' '}
                daha {totalSpent > +listData.totalAmountValue ? 'fazla' : 'az'}{' '}
                harcıyorsun!
              </Text>
            </View>
          )}
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
      )}
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
    marginTop: 8,
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
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: GlobalStyles.colors.secondary,
  },
  totalSpentText: {
    fontFamily: GlobalStyles.fonts.regular,
    fontSize: 16,
  },
  spentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttons: {
    marginVertical: 8,
    flexDirection: 'row',
    gap: 16,
  },
});

export default ActiveMarketList;
