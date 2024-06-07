'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import { ReviewsCard } from '../../../Components/ReviewsCard';
import { HotelContext } from '../../../Context/HotelContext';
import { IBookingForm, IHotelRoom, IHotelWithReview } from '../../../types';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReviewsBlock } from '../../../Components/ReviewsBlock';
import { RoomBookingOffCanvas } from '../../../Components/RoomBookingOffCanvas';
import { HotelRoomCard } from '../../../Components/HotelRoomCard';
import { getEmptyBookingForm } from '../../../util/emptyObject';
import { Loading } from '../../../Components/Loading';
import Link from 'next/link';

const HotelDetail = ({ params }: { params: { id: string } }) => {
  const [hotelWithReviews, setHotelWithReviews] = useState<IHotelWithReview>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hotelRooms, setHotelRooms] = useState<IHotelRoom[]>();
  const [bookingForm, setBookingForm] = useState<IBookingForm>(getEmptyBookingForm(params.id));
  const [showRoomBooking, setShowRoomBooking] = useState<boolean>(false);
  const { fetchHotelRooms, fetchHotelDataById } = useContext(HotelContext);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchHotelRooms(), fetchHotelDataById(params.id)])
      .then(([rooms, hotel]) => {
        setHotelRooms(rooms);
        setHotelWithReviews(hotel);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id, fetchHotelRooms, fetchHotelDataById]);

  const openRoomBookingScreen = useCallback((roomID: string) => {
    setShowRoomBooking(true);
    setBookingForm((form) => ({ ...form, roomID }));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
        <div className="py-4">
          <h2>Available rooms</h2>
          <Row>
            {hotelRooms?.map((room, index) => (
              <Col key={index}>
                <HotelRoomCard room={room} onBookRoomClick={openRoomBookingScreen} />
              </Col>
            ))}
          </Row>
        </div>

        <ReviewsBlock extraClasses="mb-4" reviews={hotelWithReviews.reviews} />

        <RoomBookingOffCanvas
          placement="end"
          show={showRoomBooking}
          room={hotelRooms?.find((room) => room.roomID === bookingForm.roomID)}
          handleClose={() => setShowRoomBooking(false)}
          bookingForm={bookingForm}
          setBookingForm={setBookingForm}
        />
      </Col>
    </Row>
  ) : (
    <div>
      <h1>Hotel not found</h1>
      <p>
        This hotel cannot be found. Go back to the <Link href="/">hotel overview</Link> page
      </p>
    </div>
  );
};
export default HotelDetail;
