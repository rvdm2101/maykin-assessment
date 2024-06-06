/* eslint-disable @typescript-eslint/no-var-requires */
const { getEmptyReview } = require('./emptyObject');
const { getAverageOverallRatingOfReviews } = require('./getAverageOverallRatingOfReviews');

test('Calculate average of one review', () => {
  const review = getEmptyReview();
  review.ratings.overall = 1;

  expect(getAverageOverallRatingOfReviews([review])).toBe(1);
});

test('Calculate average of multiple reviews', () => {
  const review1 = getEmptyReview();
  review1.ratings.overall = 1;
  const review2 = getEmptyReview();
  review2.ratings.overall = 2;

  expect(getAverageOverallRatingOfReviews([review1, review2])).toBe(1.5);
});
