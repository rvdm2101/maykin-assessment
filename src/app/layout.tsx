'use client'

import { Navigation } from "../Components/Navigation";
import { HotelContextProvider } from "../Context/HotelContext";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
            <HotelContextProvider>
                <Navigation />
                <Container>
                    <Row>
                        <Col>{children}</Col>
                    </Row>
                </Container>
            </HotelContextProvider>
        </body>
      </html>
    )
  }