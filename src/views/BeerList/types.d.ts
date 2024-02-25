export interface IListFilter {
  name: string;
  city: string;
  state: string;
  postal: string;
  type: string;
  sort: string;
  page: number;
}

export interface IMetaDataResponse {
  total: number,
  page: number,
  per_page: number
}
