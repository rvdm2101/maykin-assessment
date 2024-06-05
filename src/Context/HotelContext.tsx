import React, { createContext, useCallback, useState } from 'react';
import { IHotelWithReview } from '../types';
import { fetchHotelData } from '../util/fetchHotelData';

export type TfetchHotelDataPaginatedResult =
  | { items: IHotelWithReview[]; pages: number }
  | undefined;

interface IHotelContext {
  fetchHotelDataById: (id: string) => Promise<IHotelWithReview | undefined>;
  fetchHotelDataPaginated: (
    limit: number,
    offset: number
  ) => Promise<TfetchHotelDataPaginatedResult>;
}

const DUMMY_HOTELS_IDS = [100407, 100504, 100505, 100506, 100507, 100508, 100509];

export const HotelContext = createContext<IHotelContext>({
  fetchHotelDataById: () => Promise.resolve(undefined),
  fetchHotelDataPaginated: () => Promise.resolve(undefined)
});

export const HotelContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [hotels, setHotels] = useState<IHotelWithReview[]>([]);

  const fetchHotelDataById = useCallback(
    async (id: string) => {
      const hotel = hotels.find((hotel) => hotel.hotelInfo.hotelID === id);
      if (hotel !== undefined) {
        return hotel;
      }
      return fetchHotelData(id)
        .then((res) => {
          setHotels((hotels) => [...hotels, res]);
          return res;
        })
        .catch(() => undefined);
    },
    [hotels]
  );

  const fetchHotelDataPaginated = useCallback(async (limit: number, offset: number) => {
    // @TODO add check to see if items are already in state
    const sliceStart = offset * limit;
    return Promise.all(
      DUMMY_HOTELS_IDS.slice(sliceStart, sliceStart + limit).map((id) => fetchHotelData(id))
    )
      .then((res) => {
        setHotels((hotels) => [...hotels, ...res]);
        return { items: res, pages: Math.ceil(DUMMY_HOTELS_IDS.length / limit) };
      })
      .catch(() => undefined);
  }, []);

  return (
    <HotelContext.Provider value={{ fetchHotelDataById, fetchHotelDataPaginated }}>
      {children}
    </HotelContext.Provider>
  );
};
