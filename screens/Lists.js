import { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles } from '../constants/styles';
import { ListContext } from '../store';
import formatDate from '../utils/format-date';

const Lists = ({ navigation }) => {
  const { lists, deleteListFromLists } = useContext(ListContext);

  const deleteList = (id) => {
    Alert.alert('Listeyi Siliyorsunuz!', 'Emin Misiniz?', [
      {
        text: 'Vazgeç',
        style: 'cancel',
      },
      {
        text: 'Evet!',
        style: 'destructive',
        onPress: () => deleteListFromLists(id),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerDate}>Oluşturma Zamanı</Text>
        <Text style={styles.headerDone}>Durum</Text>
        <Text style={styles.headerCount}>Ürün</Text>
      </View>
      <FlatList
        style={styles.list}
        data={lists}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <View style={styles.itemData}>
              <Text style={styles.date}>{formatDate(item.createdDate)}</Text>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={
                    item.isDone
                      ? 'checkmark-circle-sharp'
                      : 'close-circle-sharp'
                  }
                  size={24}
                  color={item.isDone ? '#69D07E' : '#E5595F'}
                />
              </View>
              <Text style={styles.count}>{item.list.length}</Text>
            </View>
            <Ionicons
              name='trash-outline'
              size={24}
              color='#777'
              onPress={() => deleteList(item.id)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: GlobalStyles.colors.primary,
  },
  list: {
    padding: 16,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  itemData: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary,
    borderRadius: 8,
  },
  headerDate: {
    width: '40%',
    fontFamily: GlobalStyles.fonts.medium,
  },
  headerDone: {
    width: '22%',
    textAlign: 'center',
    fontFamily: GlobalStyles.fonts.medium,
  },
  headerCount: {
    width: '30%',
    textAlign: 'center',
    fontFamily: GlobalStyles.fonts.medium,
  },
  date: {
    width: '40%',
    fontFamily: GlobalStyles.fonts.semibold,
    fontSize: 16,
  },
  iconContainer: {
    alignItems: 'center',
    width: '35%',
  },
  count: {
    textAlign: 'center',
    width: '25%',
    fontFamily: GlobalStyles.fonts.semibold,
    fontSize: 16,
  },
});

export default Lists;
