import { Button, Col, Form } from 'react-bootstrap';
import { IBookingForm } from '../../types';
import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';

interface IBookingInformationFormProps {
  bookingForm: IBookingForm;
  setBookingForm: Dispatch<SetStateAction<IBookingForm>>;
  onSubmit: () => void;
}

export const BookingInformationForm = ({
  bookingForm,
  setBookingForm,
  onSubmit
}: IBookingInformationFormProps) => {
  // @TODO add js validation
  return (
    <Form className="row w-75" onSubmit={onSubmit}>
      <Col lg={12}>
        <Form.Group className="mb-3" controlId="bookingForm.FirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            value={bookingForm.firstName}
            onChange={(event) =>
              setBookingForm({ ...bookingForm, firstName: event.currentTarget.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookingForm.LastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            value={bookingForm.lastName}
            onChange={(event) =>
              setBookingForm({ ...bookingForm, lastName: event.currentTarget.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookingForm.EmailAddress">
          <Form.Label>E-mail address</Form.Label>
          <Form.Control
            required
            value={bookingForm.emailAddress}
            type="email"
            onChange={(event) =>
              setBookingForm({ ...bookingForm, emailAddress: event.currentTarget.value })
            }
          />
        </Form.Group>
      </Col>
      <Col lg={6}>
        <Form.Group className="mb-3" controlId="bookingForm.AmountOfGuests">
          <Form.Label>Amount of guests</Form.Label>
          <Form.Control
            required
            value={bookingForm.amountOfGuests}
            min="1"
            type="number"
            onChange={(event) =>
              setBookingForm({
                ...bookingForm,
                amountOfGuests: parseInt(event.currentTarget.value)
              })
            }
          />
        </Form.Group>
      </Col>
      <Col lg={6}>
        <Form.Group className="mb-3" controlId="bookingForm.AmountOfRooms">
          <Form.Label>Amount of rooms</Form.Label>
          <Form.Control
            required
            value={bookingForm.amountOfRooms}
            min="1"
            type="number"
            onChange={(event) =>
              setBookingForm({
                ...bookingForm,
                amountOfRooms: parseInt(event.currentTarget.value)
              })
            }
          />
        </Form.Group>
      </Col>
      <Col lg={6}>
        <Form.Group className="mb-3" controlId="bookingForm.ArivalDate">
          <Form.Label>Arival date</Form.Label>
          <Form.Control
            required
            type="date"
            value={bookingForm.arivalDate}
            min={dayjs(new Date()).format('YYYY-MM-DD')}
            max={dayjs(bookingForm.departureDate).subtract(1, 'day').format('YYYY-MM-DD')}
            onChange={(event) =>
              setBookingForm({ ...bookingForm, arivalDate: event.currentTarget.value })
            }
          />
        </Form.Group>
      </Col>
      <Col lg={6}>
        <Form.Group className="mb-3" controlId="bookingForm.DepartureDate">
          <Form.Label>Departure date</Form.Label>
          <Form.Control
            required
            type="date"
            value={bookingForm.departureDate}
            min={dayjs(bookingForm.arivalDate || new Date())
              .add(1, 'day')
              .format('YYYY-MM-DD')}
            onChange={(event) =>
              setBookingForm({ ...bookingForm, departureDate: event.currentTarget.value })
            }
          />
        </Form.Group>
      </Col>

      <Button type="submit">Submit booking</Button>
    </Form>
  );
};
