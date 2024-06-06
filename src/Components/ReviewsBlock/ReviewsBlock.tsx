import { useMemo } from 'react';
import { IReview, IReviewRatings } from '../../types';
import { Badge, Col, ProgressBar, Row } from 'react-bootstrap';

interface IReviewsBlock {
  extraClasses?: string;
  reviews: IReview[];
}

export const ReviewsBlock = ({ reviews, extraClasses }: IReviewsBlock) => {
  // @TODO move to util and cover with jest
  const averageScores = useMemo<IReviewRatings<number>>(() => {
    const sumOfScores = reviews.reduce<IReviewRatings<number>>(
      (carry, review) => {
        Object.keys(carry).forEach((scoreKey) => {
          const key = scoreKey as keyof IReviewRatings<number>;
          let value = parseFloat(review.ratings[key]);
          if (isNaN(value)) {
            value = parseFloat(review.ratings.overall);
          }
          carry[key] = carry[key] + value;
        });
        return carry;
      },
      {
        cleanliness: 0,
        location: 0,
        overall: 0,
        rooms: 0,
        service: 0,
        'sleep Quality': 0,
        value: 0
      }
    );

    Object.keys(sumOfScores).forEach((scoreKey) => {
      const key = scoreKey as keyof IReviewRatings<number>;
      sumOfScores[key] = Math.round((sumOfScores[key] / reviews.length) * 10) / 10;
    });
    return sumOfScores;
  }, [reviews]);
  return (
    <div className={extraClasses}>
      <h3>Guest reviews</h3>
      <div className="d-flex">
        <div className="h5">
          <Badge>{averageScores.overall}</Badge>
        </div>
        <p className="ms-2"> · {reviews.length} reviews</p>
      </div>
      <h5>Categories:</h5>
      <Row>
        {Object.entries(averageScores)
          .filter(([key]) => key !== 'overall')
          .map(([key, value], index) => (
            <Col lg={4} key={index}>
              <div className="d-flex mt-2">
                <h6 className="mb-0">{key}</h6>
                <p className="mb-0 ms-auto" style={{ fontSize: '.825rem' }}>
                  {value}
                </p>
              </div>
              <ProgressBar
                style={{ height: '.5rem' }}
                variant={value < 2.5 ? 'danger' : value < 3.75 ? 'warning' : 'primary'}
                min={0}
                max={5}
                now={value}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};
