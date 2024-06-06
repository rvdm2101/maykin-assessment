import { IReview, IReviewRatings } from '../types';
import { getEmptyReviewRatingsAsNumbers } from './emptyObject';

export const getAverageRatingsOfReviews = (reviews: IReview[]) => {
  const sumOfRatings = reviews.reduce<Required<IReviewRatings<number>>>((carry, review) => {
    Object.keys(carry).forEach((ratingKey) => {
      const key = ratingKey as keyof IReviewRatings<number>;
      carry[key] = carry[key] + parseFloat(review.ratings[key] || review.ratings.overall);
    });
    return carry;
  }, getEmptyReviewRatingsAsNumbers());

  Object.keys(sumOfRatings).forEach((ratingKey) => {
    const key = ratingKey as keyof IReviewRatings<number>;
    sumOfRatings[key] = Math.round((sumOfRatings[key] / reviews.length) * 10) / 10;
  });
  return sumOfRatings;
};
