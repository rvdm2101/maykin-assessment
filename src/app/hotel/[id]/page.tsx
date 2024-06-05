'use client';

import { useContext, useEffect, useState } from 'react';
import { ReviewsCard } from '../../../Components/ReviewsCard';
import { HotelContext } from '../../../Context/HotelContext';
import { IHotelWithReview } from '../../../types';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/esm/Spinner';

const HotelDetail = ({ params }: { params: { id: string } }) => {
  const [hotelWithReviews, setHotelWithReviews] = useState<IHotelWithReview>();
  const { fetchHotelDataById } = useContext(HotelContext);
  useEffect(() => {
    fetchHotelDataById(params.id).then((hotel) => setHotelWithReviews(hotel));
  }, [params.id, fetchHotelDataById]);
  console.log(hotelWithReviews);
  return hotelWithReviews !== undefined ? (
    <Row>
      <Col lg={12}>
        <h1 className="">{hotelWithReviews.hotelInfo.name}</h1>
        <div
          className="text-body-secondary"
          dangerouslySetInnerHTML={{ __html: hotelWithReviews.hotelInfo.address || '' }}
        />
      </Col>
      <Col lg={9}>
        <div className="ratio ratio-16x9">
          <Image src={hotelWithReviews.hotelInfo.imgURL} fluid />
        </div>
      </Col>
      <Col lg={3}>
        <ReviewsCard reviews={hotelWithReviews.reviews} />
      </Col>
    </Row>
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};
export default HotelDetail;
