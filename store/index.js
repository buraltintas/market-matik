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
    const newLists = [...lists, list];
    setLists(newLists);
    AsyncStorage.setItem('lists', JSON.stringify(newLists));
  };

  const value = {
    lists,
    updateLists,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default ListProvider;
