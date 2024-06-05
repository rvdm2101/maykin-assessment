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
  ratings: {
    cleanliness: string;
    location: string;
    overall: string;
    rooms: string;
    service: string;
    'sleep Quality': string;
    value: string;
  };
  reviewID: string;
  title: string;
}
