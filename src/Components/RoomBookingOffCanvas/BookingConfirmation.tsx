import dayjs from 'dayjs';
import { Row, Col, Button, ListGroup } from 'react-bootstrap';
import { IBookingForm, IHotelRoom } from '../../types';
import { useMemo } from 'react';
import { getAllDatesInRange } from '../../util/getAllDatesInRange';

interface IBookingConfirmationProps {
  room: IHotelRoom;
  bookingForm: IBookingForm;
  bookingConfirmed: () => void;
}

export const BookingConfirmation = ({
  room,
  bookingForm,
  bookingConfirmed
}: IBookingConfirmationProps) => {
  const arivalDate = dayjs(bookingForm.arivalDate);
  const departureDate = dayjs(bookingForm.departureDate);
  const amountOfNightsInBooking = departureDate.diff(arivalDate, 'days');
  const totalPrice = room.price * amountOfNightsInBooking * bookingForm.amountOfRooms;

  const bookedDates = useMemo(
    () => getAllDatesInRange(arivalDate, departureDate),
    [arivalDate, departureDate]
  );

  return (
    <Row>
      <Col lg={12}>
        <p className="mb-0">
          <b>First name:</b> {bookingForm.firstName}
        </p>
        <p className="mb-0">
          <b>Last name:</b> {bookingForm.lastName}
        </p>
        <p className="mb-0">
          <b>E-mail address:</b> {bookingForm.emailAddress}
        </p>
        <p className="mb-0">
          <b>Reservation:</b> {bookingForm.amountOfGuests} guests · {bookingForm.amountOfRooms}{' '}
          rooms
        </p>
        <p className="mb-0">
          <b>Room type:</b> {room.name}
        </p>

        <p className="mb-4">
          <b>Dates:</b> {arivalDate.format('dddd, DD MMMM YYYY')} -{' '}
          {departureDate.format('dddd, DD MMMM YYYY')}
          <span className="ms-1 text-body-secondary">({amountOfNightsInBooking} nights)</span>
        </p>

        <ListGroup variant="flush" className="w-50 mb-2">
          <ListGroup.Item>
            <b className="d-flex">
              {amountOfNightsInBooking} night stay <span className="ms-auto">${totalPrice}</span>
            </b>
          </ListGroup.Item>
          {bookedDates.map((day, index) => (
            <ListGroup.Item key={index} className="d-flex">
              {day.format('MMM DD')} - {day.add(1, 'day').format('MMM DD')}{' '}
              <span className="ms-auto">${room.price * bookingForm.amountOfRooms}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h5 className="mb-5">
          <b>Total price:</b> ${totalPrice}
        </h5>

        <Button onClick={bookingConfirmed}>Confirm booking</Button>
      </Col>
    </Row>
  );
};
