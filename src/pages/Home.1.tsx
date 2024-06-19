import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import backgroundImg from "../assets/background.jpg";

export function Home() {
  const isActive = true;
  const popoverRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.addEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Container
      className="mt-4 bg-primary relative p-0"
      fluid
      style={{ zIndex: 1 }}
    >
      {isOpen && (
        <div
          ref={popoverRef}
          className="position-absolute top-50 start-50 translate-middle bg-danger p-4 d-flex"
          style={{ width: "500px", height: "500px", zIndex: 10 }}
        >
          <div className="flex-grow-1 bg-warning p-4">Inner</div>
        </div>
      )}
      <Row className="p-0">
        <Col md={3} className="p-4 d-flex flex-column align-items-center my-10">
          <h1>Testimonials</h1>
          <div className="flex-fill bg-danger w-100">Row 1</div>
          <div className="flex-fill bg-secondary w-100">Row 2</div>
          <div className="flex-fill bg-info w-100">Row 3</div>
        </Col>
        <Col md={6} className="py-4">
          {" "}
          {/*offset-md-1*/}
          <Card className="">
            <img className="" src={backgroundImg} />

            <CardBody className="card-body">
              <CardTitle className="card-title">Image Title</CardTitle>
              <CardText className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} className="p-4 d-flex flex-column align-items-center my-10">
          <div className="flex-fill bg-danger w-100">Shop now</div>
          <div className="flex-fill bg-secondary w-100">
            Subscribe to newsletter
          </div>
        </Col>
      </Row>
      <Row className="text-center d-flex justify-content-center">
        <Col md={3} className="bg-warning mx-4">
          <div className="" style={{ height: "300px" }}>
            Hot product
          </div>
        </Col>
        <Col md={3} className="bg-warning mx-4">
          <div className="" style={{ height: "300px" }}>
            Hot product
          </div>
        </Col>
        <Col md={3} className="bg-warning mx-4">
          <div className="" style={{ height: "300px" }}>
            Hot product
          </div>
        </Col>
      </Row>
    </Container>
  );
}
