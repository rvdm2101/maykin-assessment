'use client';

import { useContext } from 'react';
import { HotelContext } from '../Context/HotelContext';
import { HotelCard } from '../Components/HotelCard/HotelCard';

const HomePage = () => {
  const { hotelsWithReviews } = useContext(HotelContext);
  console.log(hotelsWithReviews);
  return (
    <div>
      <ul className="list-unstyled row">
        {hotelsWithReviews.map((hotel, index) => (
          <li key={index} className="col-3 pb-4">
            <HotelCard hotel={hotel} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;
