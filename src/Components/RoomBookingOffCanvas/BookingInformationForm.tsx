import { Button, Col, Form } from 'react-bootstrap';
import { IBookingForm } from '../../types';
import { Dispatch, FormEvent, SetStateAction, useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { TValidationErrors, validateBookingForm } from '../../util/validateBookingForm';
import { YMD } from '../../util/dateFormats';

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
  const [errors, setErrors] = useState<TValidationErrors>({});
  const [isValidated, setIsValidated] = useState<boolean>(false);

  const onFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validation = validateBookingForm(bookingForm);

      setIsValidated(true);
      setErrors(validation.errors);
      if (validation.valid) {
        onSubmit();
      }
    },
    [bookingForm, onSubmit, validateBookingForm]
  );

  return (
    <Form noValidate className="row w-75" onSubmit={onFormSubmit}>
      <Col lg={12}>
        <Form.Group className="mb-3" controlId="bookingForm.FirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            isValid={isValidated && errors.firstName === undefined}
            isInvalid={errors.firstName !== undefined}
            required
            value={bookingForm.firstName}
            onChange={(event) =>
              setBookingForm({ ...bookingForm, firstName: event.currentTarget.value })
            }
          />
          <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookingForm.LastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            isValid={isValidated && errors.lastName === undefined}
            isInvalid={errors.lastName !== undefined}
            value={bookingForm.lastName}
            onChange={(event) =>
              setBookingForm({ ...bookingForm, lastName: event.currentTarget.value })
            }
          />
          <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookingForm.EmailAddress">
          <Form.Label>E-mail address</Form.Label>
          <Form.Control
            required
            isValid={isValidated && errors.emailAddress === undefined}
            isInvalid={errors.emailAddress !== undefined}
            value={bookingForm.emailAddress}
            type="email"
            onChange={(event) =>
              setBookingForm({ ...bookingForm, emailAddress: event.currentTarget.value })
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors.emailAddress?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col lg={6}>
        <Form.Group className="mb-3" controlId="bookingForm.AmountOfGuests">
          <Form.Label>Amount of guests</Form.Label>
          <Form.Control
            required
            isValid={isValidated && errors.amountOfGuests === undefined}
            isInvalid={errors.amountOfGuests !== undefined}
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
          <Form.Control.Feedback type="invalid">
            {errors.amountOfGuests?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col lg={6}>
        <Form.Group className="mb-3" controlId="bookingForm.AmountOfRooms">
          <Form.Label>Amount of rooms</Form.Label>
          <Form.Control
            required
            isValid={isValidated && errors.amountOfRooms === undefined}
            isInvalid={errors.amountOfRooms !== undefined}
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
          <Form.Control.Feedback type="invalid">
            {errors.amountOfRooms?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col lg={6}>
        <Form.Group className="mb-3" controlId="bookingForm.ArivalDate">
          <Form.Label>Arival date</Form.Label>
          <Form.Control
            required
            isValid={isValidated && errors.arivalDate === undefined}
            isInvalid={errors.arivalDate !== undefined}
            type="date"
            value={bookingForm.arivalDate}
            min={dayjs(new Date()).format(YMD)}
            max={dayjs(bookingForm.departureDate).subtract(1, 'day').format(YMD)}
            onChange={(event) =>
              setBookingForm({ ...bookingForm, arivalDate: event.currentTarget.value })
            }
          />
          <Form.Control.Feedback type="invalid">{errors.arivalDate?.message}</Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col lg={6}>
        <Form.Group className="mb-3" controlId="bookingForm.DepartureDate">
          <Form.Label>Departure date</Form.Label>
          <Form.Control
            required
            isValid={isValidated && errors.departureDate === undefined}
            isInvalid={errors.departureDate !== undefined}
            type="date"
            value={bookingForm.departureDate}
            min={dayjs(bookingForm.arivalDate || new Date())
              .add(1, 'day')
              .format(YMD)}
            onChange={(event) =>
              setBookingForm({ ...bookingForm, departureDate: event.currentTarget.value })
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors.departureDate?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Button type="submit">Submit booking</Button>
    </Form>
  );
};
