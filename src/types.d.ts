export interface IHotelWithReview {
  hotelInfo: IHotel;
  reviews: IReview[];
}

export interface IHotel {
  name: string;
  price: string;
  imgURL: string;
  hotelID: string;
  address: string; // stringified HTML
}

export interface IReview {
  author: string;
  authorLocation: string;
  content: string;
  date: string; // date in format 'MMMM D, YYYY' (i.e. 'May 5, 2024')
  ratings: IReviewRatings<string>;
  reviewID: string;
  title: string;
}

export interface IReviewRatings<T> {
  cleanliness: T;
  location: T;
  overall: T;
  rooms: T;
  service: T;
  'sleep Quality': T;
  value: T;
}
