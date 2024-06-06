/* eslint-disable @typescript-eslint/no-var-requires */
const { getAverageRatingsOfReviews } = require('./getAverageRatingsOfReviews');
const { getEmptyReview, getEmptyReviewRatingsAsNumbers } = require('./emptyObject');

test('Calculate average of one review', () => {
  const review = getEmptyReview();
  Object.keys(review.ratings).forEach((ratingKey) => {
    review.ratings[ratingKey] = 1;
  });

  expect(getAverageRatingsOfReviews([review])).toStrictEqual(review.ratings);
});

test('Calculate average of multiple reviews', () => {
  const review1 = getEmptyReview();
  Object.keys(review1.ratings).forEach((ratingKey) => {
    review1.ratings[ratingKey] = 1;
  });
  const review2 = getEmptyReview();
  Object.keys(review2.ratings).forEach((ratingKey) => {
    review2.ratings[ratingKey] = 2;
  });

  const expectedRatings = getEmptyReviewRatingsAsNumbers();
  Object.keys(expectedRatings).forEach((ratingKey) => {
    expectedRatings[ratingKey] = 1.5;
  });

  expect(getAverageRatingsOfReviews([review1, review2])).toStrictEqual(expectedRatings);
});

test('If a review only has the overall rating, that value will be used when calculating the average of another rating', () => {
  const review1 = getEmptyReview();
  Object.keys(review1.ratings).forEach((ratingKey) => {
    review1.ratings[ratingKey] = 1;
  });
  const review2 = getEmptyReview();
  review2.ratings.overall = 2;
  Object.keys(review2.ratings).forEach((ratingKey) => {
    if (ratingKey !== 'overall') {
      delete review2.ratings[ratingKey];
    }
  });

  const expectedRatings = getEmptyReviewRatingsAsNumbers();
  Object.keys(expectedRatings).forEach((ratingKey) => {
    expectedRatings[ratingKey] = 1.5;
  });

  // The ratings review2 only have the 'overall' value, but the average of all rating values is still changed to 1.5
  expect(review2.ratings).toStrictEqual({ overall: 2 });
  expect(getAverageRatingsOfReviews([review1, review2])).toStrictEqual(expectedRatings);
});
