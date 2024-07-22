import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import userStore from "../store/userStore";

export const Header = () => {
  const logoutHandler = () => {
    userStore.logout();
    window.location.href = "/";
  };
  return (
    <Navbar expand="lg" className="header">
      <Container>
        <Navbar.Brand href="/">Painting</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href={`/print/f${(+new Date()).toString()}`}>
              Printing
            </Nav.Link>
            <Nav.Link href={`/ViewPrints`}>View prints</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Button variant="outline-success" onClick={logoutHandler}>
        Log out
      </Button>
    </Navbar>
  );
};
