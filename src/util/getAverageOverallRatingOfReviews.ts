import { IReview } from '../types';

export const getAverageOverallRatingOfReviews = (reviews: IReview[]) => {
  const sumOfRating = reviews.reduce((sum, review) => sum + parseFloat(review.ratings.overall), 0);
  return Math.round((sumOfRating / reviews.length) * 10) / 10;
};
