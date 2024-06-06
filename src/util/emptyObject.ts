import { IBookingForm, IReview, IReviewRatings } from '../types';

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

export const getEmptyReviewRatingsAsNumbers = (): Required<IReviewRatings<number>> => ({
  cleanliness: 0,
  location: 0,
  overall: 0,
  rooms: 0,
  service: 0,
  'sleep Quality': 0,
  value: 0
});

export const getEmptyReviewRatingsAsStrings = (): Required<IReviewRatings<string>> => ({
  cleanliness: '0',
  location: '0',
  overall: '0',
  rooms: '0',
  service: '0',
  'sleep Quality': '0',
  value: '0'
});

export const getEmptyReview = (): IReview => ({
  author: '',
  authorLocation: '',
  content: '',
  date: '',
  ratings: getEmptyReviewRatingsAsStrings(),
  reviewID: '',
  title: ''
});
