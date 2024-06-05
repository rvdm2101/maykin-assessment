import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">My hotels</Navbar.Brand>
      </Container>
    </Navbar>
  );
};
