import { Container, Navbar } from "react-bootstrap";

export default function Layout({ children }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="">WiseSplit</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
}
