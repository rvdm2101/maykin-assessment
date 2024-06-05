'use client';

import { useContext, useEffect, useState } from 'react';
import { ReviewsCard } from '../../../Components/ReviewsCard';
import { HotelContext } from '../../../Context/HotelContext';
import { IHotelWithReview } from '../../../types';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/esm/Spinner';

const HotelDetail = ({ params }: { params: { id: string } }) => {
  const [hotelWithReviews, setHotelWithReviews] = useState<IHotelWithReview>();
  const { fetchHotelDataById } = useContext(HotelContext);
  useEffect(() => {
    fetchHotelDataById(params.id).then((hotel) => setHotelWithReviews(hotel));
  }, [params.id, fetchHotelDataById]);
  console.log(hotelWithReviews);
  return hotelWithReviews !== undefined ? (
    <Row>
      <Col lg={12}>
        <h1>{hotelWithReviews.hotelInfo.name}</h1>
        <div
          className="text-body-secondary"
          dangerouslySetInnerHTML={{ __html: hotelWithReviews.hotelInfo.address || '' }}
        />
      </Col>
      <Col lg={9}>
        <div className="ratio ratio-16x9">
          <Image src={hotelWithReviews.hotelInfo.imgURL} fluid />
        </div>
      </Col>
      <Col lg={3}>
        <ReviewsCard reviews={hotelWithReviews.reviews} />
      </Col>
      <Col className="py-3" lg={9}>
        <div className="pb-3">
          <p>
            Eu mi bibendum neque egestas congue. Orci eu lobortis elementum nibh tellus molestie
            nunc non blandit. Nibh sit amet commodo nulla facilisi nullam. Arcu bibendum at varius
            vel pharetra vel. Tortor vitae purus faucibus ornare. Iaculis urna id volutpat lacus
            laoreet non. Et odio pellentesque diam volutpat commodo. Aliquet enim tortor at auctor
            urna. Iaculis nunc sed augue lacus viverra vitae. Ornare arcu odio ut sem nulla. Enim
            nec dui nunc mattis enim. Felis eget velit aliquet sagittis. Commodo ullamcorper a lacus
            vestibulum sed arcu.
          </p>

          <p>
            Sit amet commodo nulla facilisi nullam. Est velit egestas dui id ornare arcu odio.
            Aliquet enim tortor at auctor urna nunc id. Ornare massa eget egestas purus viverra
            accumsan in nisl. Ullamcorper malesuada proin libero nunc consequat interdum varius sit.
            Nisi scelerisque eu ultrices vitae. Arcu dictum varius duis at consectetur lorem donec
            massa sapien. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt
            eget. Pellentesque sit amet porttitor eget dolor. Est ante in nibh mauris cursus mattis
            molestie. Id faucibus nisl tincidunt eget nullam non nisi est. Quam pellentesque nec nam
            aliquam sem et tortor consequat. Habitant morbi tristique senectus et netus et malesuada
            fames. Amet porttitor eget dolor morbi. Proin nibh nisl condimentum id venenatis a
            condimentum vitae.
          </p>

          <p>
            Aenean vel elit scelerisque mauris pellentesque. Nunc aliquet bibendum enim facilisis
            gravida neque convallis a cras. Nullam non nisi est sit amet facilisis. Eu feugiat
            pretium nibh ipsum. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. A
            condimentum vitae sapien pellentesque habitant. Et egestas quis ipsum suspendisse
            ultrices. Facilisis leo vel fringilla est ullamcorper. Curabitur vitae nunc sed velit.
            Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Porta nibh
            venenatis cras sed. Dolor sit amet consectetur adipiscing elit pellentesque habitant.
            Vitae congue mauris rhoncus aenean. Eros in cursus turpis massa tincidunt dui. Ante
            metus dictum at tempor commodo ullamcorper a lacus. At quis risus sed vulputate.
          </p>
        </div>
        <hr />
        <div className="pt-4">
          <h2>Available rooms</h2>
          <Row>
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/207302684.jpg?k=b7c70ca0350bd6419c549127ddbd4d3dc182e751114fc7a692c19b02af59b76a&o="
                />
                <Card.Body>
                  <Card.Title>Mixed Dormitory</Card.Title>
                  <Card.Text>A mixed dormitory for 8 persons. With shared bathroom.</Card.Text>
                  <Button variant="primary">Book room</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/113581334.jpg?k=6dbfc14ed8b39c1e0de386c4b1a794e778eca5d9e0c7d7431608c07cf6438af7&o="
                />
                <Card.Body>
                  <Card.Title>Small Double Room</Card.Title>
                  <Card.Text>A small double room, with ensuite bathroom.</Card.Text>
                  <Button variant="primary">Book room</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/113288806.jpg?k=06f6c18e86f08429d2413b01d7f745ceff4b2434d581aae1d88d7573fbb81aca&o="
                />
                <Card.Body>
                  <Card.Title>Deluxe Double Room</Card.Title>
                  <Card.Text>A luxurious double room, with ensuite bathroom.</Card.Text>
                  <Button variant="primary">Book room</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};
export default HotelDetail;
