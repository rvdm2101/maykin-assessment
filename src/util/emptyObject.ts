import { IBookingForm } from '../types';

export const getEmptyBookingForm = (hotelID: string = ''): IBookingForm => ({
  hotelID,
  roomID: '',
  firstName: '',
  lastName: '',
  emailAddress: '',
  departureDate: '',
  arivalDate: '',
  amountOfGuests: 1,
  amountOfRooms: 1
});
