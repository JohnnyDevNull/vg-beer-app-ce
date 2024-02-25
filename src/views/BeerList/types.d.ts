import { SORT } from '../../types';

export interface IListFilter {
  name: string;
  city: string;
  state: string;
  postal: string;
  type: string;
  sort: SORT;
  page: number;
}

export interface IMetaDataResponse {
  total: number,
  page: number,
  per_page: number
}
