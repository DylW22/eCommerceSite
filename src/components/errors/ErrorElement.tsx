import { Link } from "react-router-dom";
import { useDynamicBackground } from "../../hooks/useDynamicBackground";
import { Button, Container, NavLink } from "react-bootstrap";
import { NavLink as RRNavLink } from "react-router-dom";
export const ErrorElement = () => {
  const { styles } = useDynamicBackground();
  return (
    <Container
      fluid
      className="p-0 m-0 d-flex justify-content-center align-items-center"
      style={{ background: styles, height: "100vh" }}
    >
      <Container
        fluid
        className="bg-white p-5 w-50  d-flex flex-column justify-content-between align-items-center rounded-3"
      >
        <Button className="w-20">
          <NavLink as={RRNavLink} to="/">
            Return home
          </NavLink>
        </Button>
        <div>Oops you found an error!</div>
      </Container>
    </Container>
  );
};
