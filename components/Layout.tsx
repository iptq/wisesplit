import { Container, Navbar } from "react-bootstrap";

export interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props) {
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

      <footer style={{ textAlign: "center" }}>
        <small>
          <a href="https://github.com/iptq/wisesplit/" target="_blank" rel="noreferrer">
            [source]
          </a>
          &middot;
          <a href="https://www.gnu.org/licenses/agpl-3.0.txt" target="_blank" rel="noreferrer">
            [license]
          </a>
          &middot;
          {/* eslint-disable @next/next/no-img-element */}
          <a href="https://github.com/iptq/wisesplit/stargazers">
            <img
              alt="GitHub stars"
              src="https://img.shields.io/github/stars/iptq/wisesplit?style=social"
            />
          </a>
        </small>
      </footer>
    </>
  );
}
