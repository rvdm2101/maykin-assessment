import { IHotelWithReview } from '../types';

export const sortHotelsByIds = (ids: number[], hotels: IHotelWithReview[]) =>
  hotels.sort(
    (a, b) =>
      ids.indexOf(parseInt(a.hotelInfo.hotelID)) - ids.indexOf(parseInt(b.hotelInfo.hotelID))
  );
