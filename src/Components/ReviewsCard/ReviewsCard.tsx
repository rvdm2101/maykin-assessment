import { useMemo } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { IReview } from '../../types';

interface IReviewsCard {
  reviews: IReview[];
}

export const ReviewsCard = ({ reviews }: IReviewsCard) => {
  // @TODO move to util and cover with jest?
  const averageScore = useMemo(() => {
    const average =
      reviews.reduce((sum, review) => sum + parseFloat(review.ratings.overall), 0) / reviews.length;
    return Math.round(average * 10) / 10;
  }, [reviews]);

  return (
    <Card>
      <Card.Header className="d-flex text-end">
        <div className="ms-auto me-2">
          <Card.Title className="mb-0">Card Title</Card.Title>
          <Card.Text className="h6 text-body-secondary">{reviews.length} reviews</Card.Text>
        </div>
        <div className="h4">
          <Badge>{averageScore}</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <Carousel data-bs-theme="dark" interval={null} indicators={false}>
          {reviews.slice(0, 5).map((review, key) => (
            <Carousel.Item key={key} style={{ height: '15rem' }}>
              <Carousel.Caption
                className="position-relative p-0 bottom-0 text-start d-flex flex-column h-100 mh-100"
                style={{ width: '70%' }}>
                <h6>{review.title}</h6>
                <p style={{ fontSize: '.825rem' }}>{review.content.substring(0, 170) + '...'}</p>
                <div className="mt-auto d-flex">
                  <p className="text-black-50 mb-0">{review.author}</p>
                  <Badge className="ms-auto border" bg="light" text="dark">
                    {review.ratings.overall}
                  </Badge>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Card.Body>
    </Card>
  );
};
