import React from "react";
import { Col, Row } from "react-bootstrap";
import { StarRatingProps } from "../../types";
import { getStars } from "../../utilities/getStars";

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5;
  const stars = getStars({ rating, totalStars });

  return (
    <>
      <Row className="d-flex flex-row justify-content-center align-items-center">
        {stars}
      </Row>
    </>
  );
};

export default StarRating;
