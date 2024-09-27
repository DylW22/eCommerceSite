import { Container, Image, Row } from "react-bootstrap";
import HeroImage from "../../assets/website-hero.jpg";
export const HeroSection = () => {
  return (
    <Container
      fluid
      className="p-0 m-0 rounded-3 h-25 fw-bold fs-1 d-flex flex-column justify-content-center align-items-center"
    >
      <Row className="mb-4 w-50">
        <Image src={HeroImage} style={{ height: "400px" }} />
      </Row>
    </Container>
  );
};
