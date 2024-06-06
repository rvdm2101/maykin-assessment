import { Button, Card } from 'react-bootstrap';
import { IHotelRoom } from '../../types';

interface IHotelRoomCardProps {
  room: IHotelRoom;
  onBookRoomClick: (roomID: string) => void;
}

export const HotelRoomCard = ({ room, onBookRoomClick }: IHotelRoomCardProps) => {
  return (
    <Card>
      <Card.Img variant="top" src={room.imgURL} />
      <Card.Body>
        <Card.Title>
          {room.name}
          <span className="d-block text-body-secondary" style={{ fontSize: '.875rem' }}>
            ${room.price} per night
          </span>
        </Card.Title>
        <Card.Text>{room.description}</Card.Text>
        <Button variant="primary" onClick={() => onBookRoomClick(room.roomID)}>
          Book room
        </Button>
      </Card.Body>
    </Card>
  );
};
