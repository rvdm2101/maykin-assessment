export interface IHotelWithReview {
  hotelInfo: {
    name: string;
    price: string;
    imgURL: string;
    hotelID: string;
    address: string; // stringified HTML
  };
  reviews: {
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
  }[];
}
