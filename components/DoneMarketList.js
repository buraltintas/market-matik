import { useEffect, useState } from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import TitleText from '../components/TitleText';
import ListItem from '../components/ListItem';
import { GlobalStyles } from '../constants/styles';
import formatDate from '../utils/format-date';

const DoneMarketList = (props) => {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    if (props.listData.list) setTotalSpent(calculateTotalSpent());
  }, [props.listData.list]);

  const calculateTotalSpent = () => {
    let sum = 0;

    props.listData.list.forEach((l) => {
      sum += +l.priceValue;
    });

    return sum;
  };

  if (props.listData.list.length < 1) return null;

  return (
    <View style={styles.container}>
      <TitleText text='Bu Alışverişi Tamamladın!' />

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Market Adı:</Text>
        <Text style={styles.label}>{props.listData.marketName || '-'}</Text>
      </View>

      <View style={styles.labelContainer}>
        <View style={styles.amountTextContainer}>
          <Text style={styles.label}>Belirlediğin Hedef Tutar:</Text>
          <Text style={styles.amountText}>
            {props.listData.totalAmountText || '0'}
          </Text>
        </View>
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Liste Oluşturma Tarihi:</Text>
        <Text style={styles.label}>
          {props.listData.createdDate
            ? formatDate(props.listData.createdDate)
            : '-'}
        </Text>
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Alışveriş Tamamlama Tarihi:</Text>
        <Text style={styles.label}>
          {props.listData.doneDate ? formatDate(props.listData.doneDate) : '-'}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.list}
          data={props.listData.list}
          renderItem={({ item, index }) => (
            <ListItem item={item} order={index + 1} withJustAmount />
          )}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>

      <View style={styles.footer}>
        {totalSpent > 0 && (
          <Text style={styles.totalSpentText}>
            Sepetteki Toplam Tutar: ₺ {totalSpent.toLocaleString('tr-TR')}
          </Text>
        )}
        {totalSpent > 0 && props.listData.totalAmountValue > 0 && (
          <View style={styles.spentContainer}>
            <Ionicons
              name={
                totalSpent > +props.listData.totalAmountValue
                  ? 'close-circle-sharp'
                  : 'checkmark-circle-sharp'
              }
              size={16}
              color={
                totalSpent > +props.listData.totalAmountValue
                  ? '#E5595F'
                  : '#69D07E'
              }
            />
            <Text style={styles.totalSpentText}>
              Hedefinden ₺{' '}
              {Math.abs(
                totalSpent - +props.listData.totalAmountValue
              ).toLocaleString('tr-TR')}{' '}
              daha{' '}
              {totalSpent > +props.listData.totalAmountValue ? 'fazla' : 'az'}{' '}
              harcadın!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  label: {
    fontFamily: GlobalStyles.fonts.medium,
    fontSize: 16,
  },
  amountContainer: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: GlobalStyles.colors.primary,
  },
  amountTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  list: {
    borderTopWidth: 1,
    borderColor: GlobalStyles.colors.primary,
    padding: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: GlobalStyles.colors.primary,
    height: 120,
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
});

export default DoneMarketList;
