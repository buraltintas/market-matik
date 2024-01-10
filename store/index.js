import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const ListContext = createContext({});

const ListProvider = ({ children }) => {
  const [marketList, setMarketList] = useState([]);
  const [targetAmount, setTargetAmount] = useState(null);

  useEffect(() => {
    async function setDataFromStorage() {
      const list = await AsyncStorage.getItem('marketList');
      const amount = await AsyncStorage.getItem('targetAmount');

      if (list) setMarketList(list);
      if (amount) setTargetAmount(amount);
    }

    setDataFromStorage();
  }, []);

  const updateMarketlist = (list) => {
    setMarketList(list);
    AsyncStorage.setItem('marketList', list);
  };

  const updateTargetAmount = (amount) => {
    setTargetAmount(amount);
    AsyncStorage.setItem('targetAmount', amount);
  };

  const value = {
    marketList,
    targetAmount,
    updateMarketlist,
    updateTargetAmount,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default ListProvider;
