import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
//import { Container } from "react-bootstrap";

export function Root() {
  return (
    <div>
      <Header />

      <Outlet />
      {/*<Container className="mb-4">
        <Outlet />
      </Container>*/}
    </div>
  );
}
