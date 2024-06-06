import { useMemo } from 'react';
import { IReview, IReviewRatings } from '../../types';
import { Badge, Col, ProgressBar, Row } from 'react-bootstrap';
import { getAverageRatingsOfReviews } from '../../util/getAverageRatingsOfReviews';

interface IReviewsBlock {
  extraClasses?: string;
  reviews: IReview[];
}

export const ReviewsBlock = ({ reviews, extraClasses }: IReviewsBlock) => {
  const averageRatings = useMemo<IReviewRatings<number>>(
    () => getAverageRatingsOfReviews(reviews),
    [reviews]
  );
  return (
    <div className={extraClasses}>
      <h3>Guest reviews</h3>
      <div className="d-flex">
        <div className="h5">
          <Badge>{averageRatings.overall}</Badge>
        </div>
        <p className="ms-2"> · {reviews.length} reviews</p>
      </div>
      <h5>Categories:</h5>
      <Row>
        {Object.entries(averageRatings)
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
