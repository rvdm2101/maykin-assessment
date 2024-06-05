import React, { createContext, useEffect, useState } from 'react';
import { objectKeyToCamelCaseRecursively } from '../util/objectKeyToCamelCase';

interface IHotelWithReview {
  hotelInfo: {
    name: string;
    price: string;
    imgURL: string;
    hotelId: string;
    address: string; // stringified HTML
  };
  reviews: {
    author: string;
    authorLocation: string;
    content: string;
    date: string; // date in format 'MMMM D, YYYY' (i.e. 'May 5, 2024')
    ratings: {
      cleanliness: string;
      location: string;
      overall: string;
      rooms: string;
      service: string;
      'sleep Quality': string;
      value: string;
    };
    reviewID: string;
    title: string;
  }[];
}

interface IHotelContext {
  hotelsWithReviews: IHotelWithReview[];
}

const DUMMY_HOTELS_IDS = [100407, 100504, 100505, 100506, 100507, 100508, 100509];

export const HotelContext = createContext<IHotelContext>({
  hotelsWithReviews: []
});

export const HotelContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [hotels, setHotels] = useState<IHotelWithReview[]>([]);
  useEffect(() => {
    async function fetchData() {
      Promise.all(
        DUMMY_HOTELS_IDS.map((id) =>
          fetch(`https://raw.githubusercontent.com/WillGardella/hotels/master/json/${id}.json`)
            .then((response) => response.json())
            .then((json) => objectKeyToCamelCaseRecursively(json))
        )
      ).then((res) => {
        setHotels(res);
      });
    }
    fetchData();
  }, []);

  return (
    <HotelContext.Provider value={{ hotelsWithReviews: hotels }}>{children}</HotelContext.Provider>
  );
};
