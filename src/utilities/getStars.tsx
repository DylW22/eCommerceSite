import React from "react";
import { Col } from "react-bootstrap";
import filledStar from "../assets/filled-star.svg";
import emptyStar from "../assets/empty-star.svg";
import { GetStarsProps } from "../types";

export const getStars = ({ rating, totalStars }: GetStarsProps) => {
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <Col
        key={i}
        sm={2}
        className="d-flex align-items-center justify-content-center"
      >
        <img
          className=""
          height={"20px"}
          src={i <= rating ? filledStar : emptyStar}
        />
      </Col>
    );
  }

  return stars;
};
