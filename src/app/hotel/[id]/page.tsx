'use client';

import { useContext, useMemo } from 'react';
import { HotelContext } from '../../../Context/HotelContext';

const HotelDetail = ({ params }: { params: { id: string } }) => {
  const { hotelsWithReviews } = useContext(HotelContext);
  const hotelWithReviews = useMemo(() => {
    return hotelsWithReviews.find((hotel) => hotel.hotelInfo.hotelID === params.id);
  }, [params.id, hotelsWithReviews]);
  return (
    <div>
      {params.id}
      {hotelWithReviews?.hotelInfo.name}
    </div>
  );
};
export default HotelDetail;
