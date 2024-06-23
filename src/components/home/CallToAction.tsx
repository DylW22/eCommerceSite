import React, { useCallback } from "react";
import { Link } from "react-router-dom";
export const CallToAction = () => {
  return (
    <div className="min-height-200 rounded-4 h-100 text-center d-flex">
      <Link
        to="/store" //bg-danger
        className="text-decoration-none h-100 flex-fill rounded-5 d-flex align-items-center justify-content-center cta-link cta-link:hover"
      >
        <div className=" fs-1 fw-bold text-white">Shop now!</div>
      </Link>
    </div>
  );
};
