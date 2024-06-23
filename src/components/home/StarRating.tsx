import React from "react";
import { Row, Col } from "react-bootstrap";
import { StarRatingProps } from "../../types";
import { getStars } from "../../utilities/getStars";

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5;
  const stars = getStars({ rating, totalStars });

  return (
    <Row className="d-flex justify-content-center align-items-center">
      {stars}
    </Row>
  );
};

export default StarRating;
