import { getRandomBeerList, searchBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList(10);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

const searchData = (setData: (data: Array<Beer>) => void, query: string) => {
  (async () => {
    try {
      const { data } = await searchBeerList(query);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData, searchData };
