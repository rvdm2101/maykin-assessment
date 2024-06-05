'use client';

import { useContext } from 'react';
import { HotelContext } from '../Context/HotelContext';
import Link from 'next/link';

const HomePage = () => {
  const { hotelsWithReviews } = useContext(HotelContext);
  console.log(hotelsWithReviews);
  return (
    <div>
      <ul>
        {hotelsWithReviews.map((hotel, index) => (
          <li key={index}>
            <Link href={`/hotel/${hotel.hotelInfo.hotelID}`}>{hotel.hotelInfo.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;
