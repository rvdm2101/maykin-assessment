import { Button, Card } from 'react-bootstrap';
import { IHotelRoom } from '../../types';

interface IHotelRoomCardProps {
  room: IHotelRoom;
}

export const HotelRoomCard = ({ room }: IHotelRoomCardProps) => {
  return (
    <Card>
      <Card.Img variant="top" src={room.imgURL} />
      <Card.Body>
        <Card.Title>{room.name}</Card.Title>
        <Card.Text>{room.description}</Card.Text>
        <Button variant="primary">Book room</Button>
      </Card.Body>
    </Card>
  );
};
