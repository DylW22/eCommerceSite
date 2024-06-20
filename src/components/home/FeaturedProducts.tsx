import { Col } from "react-bootstrap";
export const FeaturedProducts = () => {
  let test = [0, 1, 2];

  return (
    <>
      {test &&
        test.map((item, index) => (
          <Col key={index} sm={12} md={3} className="bg-warning my-3 my-md-0">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "300px" }}
            >
              Hot product {item}
            </div>
          </Col>
        ))}
    </>
  );
};
