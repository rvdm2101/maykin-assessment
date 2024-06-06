import React, { createContext, useCallback, useState } from 'react';
import { IHotelRoom, IHotelWithReview } from '../types';
import { fetchHotelData } from '../util/fetchHotelData';

export type TfetchHotelDataPaginatedResult =
  | { items: IHotelWithReview[]; pages: number }
  | undefined;

type THotelsState = { [key: string]: IHotelWithReview };

interface IHotelContext {
  fetchHotelRooms: () => Promise<IHotelRoom[] | undefined>;
  fetchHotelDataById: (id: string) => Promise<IHotelWithReview | undefined>;
  fetchHotelDataPaginated: (
    limit: number,
    offset: number
  ) => Promise<TfetchHotelDataPaginatedResult>;
}

const DUMMY_HOTELS_IDS = [100407, 100504, 100505, 100506, 100507, 100508, 100509];

export const HotelContext = createContext<IHotelContext>({
  fetchHotelRooms: () => Promise.resolve(undefined),
  fetchHotelDataById: () => Promise.resolve(undefined),
  fetchHotelDataPaginated: () => Promise.resolve(undefined)
});

export const HotelContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [hotels, setHotels] = useState<THotelsState>({});

  const fetchHotelRooms = useCallback(async () => {
    return fetch('/resource/hotelRooms.json')
      .then((response) => response.json())
      .catch(() => undefined);
  }, []);

  const fetchHotelDataById = useCallback(
    async (id: string) => {
      if (Object.keys(hotels).includes(id)) {
        return hotels[id];
      }
      return fetchHotelData(id)
        .then((res) => {
          setHotels((hotels) => ({ ...hotels, [res.hotelInfo.hotelID]: res }));
          return res;
        })
        .catch(() => undefined);
    },
    [hotels]
  );

  // @TODO should be covered by jest
  const sortHotelsOnIds = (ids: number[], hotels: IHotelWithReview[]) =>
    hotels.sort(
      (a, b) =>
        ids.indexOf(parseInt(a.hotelInfo.hotelID)) - ids.indexOf(parseInt(b.hotelInfo.hotelID))
    );

  // @TODO should be covered by jest? (maybe partly...)
  const fetchHotelDataPaginated = useCallback(
    async (limit: number, offset: number): Promise<TfetchHotelDataPaginatedResult> => {
      const sliceStart = offset * limit;
      const hotelIdsToReturn = DUMMY_HOTELS_IDS.slice(sliceStart, sliceStart + limit);
      const amountOfPages = Math.ceil(DUMMY_HOTELS_IDS.length / limit);

      // Get all the "hotels to return" from the state
      const hotelsAlreadyFetched: IHotelWithReview[] = [];
      for (let index = 0; index < hotelIdsToReturn.length; index++) {
        const id = hotelIdsToReturn[index];
        if (Object.keys(hotels).includes(`${id}`)) {
          hotelsAlreadyFetched.push(hotels[id]);
        }
      }

      // If all hotels are already in the global state, return them in the correct order
      if (hotelsAlreadyFetched.length === hotelIdsToReturn.length) {
        return Promise.resolve({
          items: sortHotelsOnIds(hotelIdsToReturn, hotelsAlreadyFetched),
          pages: amountOfPages
        });
      }

      // Get all the hotel ids of the hotels that still have to be fetched
      const hotelIdsToFetch = hotelIdsToReturn.filter(
        (id) => !hotelsAlreadyFetched.find((hotel) => hotel.hotelInfo.hotelID === `${id}`)
      );

      const fetchedHotels = await Promise.all(hotelIdsToFetch.map((id) => fetchHotelData(id)))
        .then((res) => {
          setHotels((hotels) => {
            const result = { ...hotels };
            res.forEach((hotel) => (result[hotel.hotelInfo.hotelID] = hotel));
            return result;
          });
          return res;
        })
        .catch(() => undefined);

      return fetchedHotels !== undefined
        ? {
            items: sortHotelsOnIds(hotelIdsToReturn, [...fetchedHotels, ...hotelsAlreadyFetched]),
            pages: amountOfPages
          }
        : undefined;
    },
    [hotels]
  );

  return (
    <HotelContext.Provider value={{ fetchHotelRooms, fetchHotelDataById, fetchHotelDataPaginated }}>
      {children}
    </HotelContext.Provider>
  );
};
