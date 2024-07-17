import React from "react";
import { CardTitle, Card, CardBody, CardFooter } from "react-bootstrap";
import StarRating from "./StarRating";
import { TestimonialProps } from "../../types";
import { useTheme } from "../../context/ThemeContext";
export const Testimonial: React.FC<TestimonialProps> = ({ item }) => {
  const { theme } = useTheme();
  return (
    <Card
      style={{ height: "200px" }}
      className={`mx-2 mx-md-0 flex-fill p-4 ${
        theme === "light" ? "custom-lightGray" : "bg-midnight text-white"
      } rounded-5 my-md-2 d-flex flex-column justify-content-center align-items-center`}
    >
      <CardTitle className="fw-bold fs-4">{item.title}</CardTitle>
      <CardBody className="fw-bold">
        <em>{item.content}</em>, {item.name}
      </CardBody>
      <CardFooter className="d-none d-sm-flex custom-lightGray rounded-3">
        <StarRating rating={item.rating} />
      </CardFooter>
    </Card>
  );
};
