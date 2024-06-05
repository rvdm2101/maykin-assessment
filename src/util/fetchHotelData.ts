import { IHotelWithReview } from '../types';
import { objectKeyToCamelCaseRecursively } from './objectKeyToCamelCase';

type TFetchHotelData = (id: string | number) => Promise<IHotelWithReview>;

export const fetchHotelData: TFetchHotelData = (id: string | number) =>
  fetch(`https://raw.githubusercontent.com/WillGardella/hotels/master/json/${id}.json`)
    .then((response) => response.json())
    .then((json) => objectKeyToCamelCaseRecursively(json));
