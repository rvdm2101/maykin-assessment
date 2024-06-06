import Offcanvas, { OffcanvasProps } from 'react-bootstrap/Offcanvas';
import { IBookingForm, IHotelRoom } from '../../types';
import { Dispatch, SetStateAction, useState } from 'react';
import { BookingInformationForm } from './BookingInformationForm';
import { BookingConfirmation } from './BookingConfirmation';
import { getEmptyBookingForm } from '../../util/emptyObject';

interface IRoomBookingOffCanvasProps extends OffcanvasProps {
  show: boolean;
  room?: IHotelRoom;
  bookingForm: IBookingForm;
  setBookingForm: Dispatch<SetStateAction<IBookingForm>>;
  handleClose: () => void;
}

export const RoomBookingOffCanvas = ({
  show,
  room,
  bookingForm,
  setBookingForm,
  handleClose,
  ...props
}: IRoomBookingOffCanvasProps) => {
  const [formState, setFormState] = useState(1);

  const onOffCanvasClose = () => {
    setFormState(1);
    handleClose();
  };

  const onBookingConfirmed = () => {
    alert('Booking is submitted');
    setFormState(1);
    setBookingForm(getEmptyBookingForm());
    handleClose();
  };

  return (
    <Offcanvas show={show} onHide={onOffCanvasClose} className="w-50" {...props}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {formState === 1 ? `Booking room: ${room?.name}` : 'Booking confirmation'}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {room === undefined ? (
          <p>Cannot find the requested room...</p>
        ) : (
          <>
            {formState === 1 ? (
              <BookingInformationForm
                bookingForm={bookingForm}
                setBookingForm={setBookingForm}
                onSubmit={() => setFormState(2)}
              />
            ) : null}
            {formState === 2 ? (
              <BookingConfirmation
                bookingForm={bookingForm}
                room={room}
                bookingConfirmed={onBookingConfirmed}
              />
            ) : null}
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
