import React, { createContext, useEffect, useState } from 'react';
import { objectKeyToCamelCaseRecursively } from '../util/objectKeyToCamelCase';
import { IHotelWithReview } from '../types';

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
