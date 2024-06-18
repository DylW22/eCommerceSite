import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Container } from "react-bootstrap";

export function Root() {
  return (
    <div>
      <Header />
      <Outlet />
      {/*To fix positioning */}
      {/*<Container className="mb-4">
        <Outlet />
      </Container>*/}
    </div>
  );
}
