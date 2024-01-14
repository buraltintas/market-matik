import { useContext, useLayoutEffect, useState } from 'react';
import { Text } from 'react-native';
import { ListContext } from '../store';
import ActiveMarketList from '../components/ActiveMarketList';
import DoneMarketList from '../components/DoneMarketList';

const MarketList = ({ route, navigation }) => {
  const { getSelectedList } = useContext(ListContext);
  const [listData, setListData] = useState({
    list: [],
  });

  useLayoutEffect(() => {
    setListData(getSelectedList(route.params.id));
  }, []);

  return (
    <>
      {listData.list.length > 0 && !listData.isDone ? (
        <ActiveMarketList
          listData={listData}
          id={route.params.id}
          navigation={navigation}
        />
      ) : (
        <DoneMarketList listData={listData} />
      )}
    </>
  );
};

export default MarketList;
