import { getBeer } from '../../api';
import { Beer as IBeer, Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Beer) => void, id?: string) => {
  if (!id) return;

  (async () => {
    try {
      const response = await getBeer(id);
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

function extractBeerParams(beer: IBeer): string[] {
  const params: string[] = [];

  if (beer?.name) {
    params.push(beer.name);
  }

  if (beer?.street) {
    params.push(beer.street);
  }

  if (beer?.city) {
    params.push(beer.city);
  }

  if (beer?.postal_code) {
    params.push(beer.postal_code);
  }

  if (beer?.state) {
    params.push(beer.state);
  }

  if (beer?.country) {
    params.push(beer.country);
  }

  return params;
}

export { fetchData, extractBeerParams };
