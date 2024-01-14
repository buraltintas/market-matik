import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const ListContext = createContext({});

const ListProvider = ({ children }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function setDataFromStorage() {
      const storedLists = await AsyncStorage.getItem('lists');

      if (storedLists) setLists(JSON.parse(storedLists));
    }

    setDataFromStorage();
  }, []);

  const updateLists = (list) => {
    if (!list) return;
    const newLists = [list, ...lists];

    setLists(newLists);
    AsyncStorage.setItem('lists', JSON.stringify(newLists));
  };

  const deleteListFromLists = (id) => {
    if (!id) return;
    const newLists = lists.filter((l) => l.id !== id);

    setLists(newLists);
    AsyncStorage.setItem('lists', JSON.stringify(newLists));
  };

  const getSelectedList = (id) => {
    if (!id) return;
    const selectedList = lists.find((l) => l.id === id);

    return selectedList;
  };

  const updateList = (id, listData) => {
    const copyLists = [...lists];
    const selectedIndex = copyLists.findIndex((l) => l.id === id);
    copyLists[selectedIndex] = listData;
    setLists(copyLists);
    AsyncStorage.setItem('lists', JSON.stringify(copyLists));
  };

  const finishList = (id, listData) => {
    const copyLists = [...lists];
    const selectedIndex = copyLists.findIndex((l) => l.id === id);
    copyLists[selectedIndex] = listData;
    copyLists[selectedIndex].isDone = true;
    copyLists[selectedIndex].doneDate = new Date();
    setLists(copyLists);
    AsyncStorage.setItem('lists', JSON.stringify(copyLists));
  };

  const value = {
    lists,
    updateLists,
    deleteListFromLists,
    getSelectedList,
    updateList,
    finishList,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default ListProvider;
