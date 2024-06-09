import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
export const Navbar = () => {
  return (
    <Nav>
      <Nav.Link to="/" as={NavLink}>
        Home
      </Nav.Link>
      <Nav.Link to="/store" as={NavLink}>
        Store
      </Nav.Link>
      <Nav.Link to="/about" as={NavLink}>
        About
      </Nav.Link>
      <Nav.Link to="/testpage" as={NavLink}>
        TestPage
      </Nav.Link>
    </Nav>
  );
};
