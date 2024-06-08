import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Container } from "react-bootstrap";

export function Root() {
  return (
    <div>
      <Navbar />
      <Container className="mb-4">
        <Outlet />
      </Container>
    </div>
  );
}
