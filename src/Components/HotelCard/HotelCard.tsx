import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { IHotelWithReview } from '../../types';
import './HotelCard.scss';

interface HotelCardProps {
  hotel: IHotelWithReview;
}

export const HotelCard = ({ hotel }: HotelCardProps) => (
  <Link href={`/hotel/${hotel.hotelInfo.hotelID}`} className="text-decoration-none h-100">
    <Card className="h-100 hotel-card">
      <div className="ratio ratio-16x9">
        <Card.Img variant="top" src={hotel.hotelInfo.imgURL} />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{hotel.hotelInfo.name}</Card.Title>
        <Card.Text className="mt-auto text-body-secondary">{hotel.hotelInfo.price}</Card.Text>
      </Card.Body>
    </Card>
  </Link>
);
