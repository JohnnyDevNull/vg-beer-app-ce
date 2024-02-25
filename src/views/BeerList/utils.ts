import { getBeerList, getBeerMetaData } from '../../api';
import { Beer, SORT, TYPE } from '../../types';
import handle from '../../utils/error';
import { IListFilter, IMetaDataResponse } from './types';

const fetchData = (
  setData: (data: Array<Beer>) => void,
  setMeta: (data: IMetaDataResponse) => void,
  filter: IListFilter
) => {
  (async () => {
    try {
      const {
        page,
        sort,
        name: by_name,
        city: by_city,
        state: by_state,
        postal: by_postal,
        type: by_type
      } = filter;

      const apiParams = {
        by_name: by_name.length ? by_name : undefined,
        by_city: by_city.length ? by_city : undefined,
        by_state: by_state.length ? by_state: undefined,
        by_type: by_type.length ? by_type as TYPE : undefined,
        by_postal: by_postal.length ? by_postal : undefined,
        page,
        per_page: 10,
        sort: sort as SORT
      };

      const dataResponse = await getBeerList(apiParams);
      const metaResponse = await getBeerMetaData(apiParams);

      setData(dataResponse.data);
      setMeta(metaResponse.data);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData };
