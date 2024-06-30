import { Container } from "react-bootstrap";

export const HeroSection = () => {
  return (
    <Container
      fluid
      className="p-0 m-0 bg-primary rounded-3 h-25 fw-bold fs-1 d-flex justify-content-center align-items-center"
    >
      <div className="mx-2">HERO</div>
    </Container>
  );
};
