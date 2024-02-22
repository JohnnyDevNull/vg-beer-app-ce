import axios from 'axios';
import { API } from './config';
import { ApiParams } from '../types';

const getBeer = (id: string) => axios.get(`${API}breweries/${id}`);

const getBeerList = (params?: ApiParams) => axios.get(`${API}breweries/`, { params });

/**
 * @param size Int between 1 and 50. Default is 3.
 * @returns New promise with api call for random beer list.
 */
const getRandomBeerList = (size = 3) =>
  axios.get(`${API}breweries/random`, {
    params: { size },
  });

const searchBeerList = (query: string, isAutoComplete = false) =>
  axios.get(`${API}breweries/${isAutoComplete ? 'autocomplete' : 'search'}`, {
    params: { query },
  });

const getBeerMetaData = (params?: ApiParams) => axios.get(`${API}breweries/meta`, { params });

export { getBeer, getBeerList, getRandomBeerList, searchBeerList, getBeerMetaData };
