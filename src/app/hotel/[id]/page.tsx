'use client';

import { useContext, useEffect, useState } from 'react';
import { HotelContext } from '../../../Context/HotelContext';
import { IHotelWithReview } from '../../../types';

const HotelDetail = ({ params }: { params: { id: string } }) => {
  const [hotelWithReviews, setHotelWithReviews] = useState<IHotelWithReview>();
  const { fetchHotelDataById } = useContext(HotelContext);
  useEffect(() => {
    fetchHotelDataById(params.id).then((hotel) => setHotelWithReviews(hotel));
  }, [params.id, fetchHotelDataById]);
  return (
    <div>
      {params.id}
      {hotelWithReviews?.hotelInfo.name}
    </div>
  );
};
export default HotelDetail;
