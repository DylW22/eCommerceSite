import React, { forwardRef } from "react"; //ForwardedRef, RefObject
import { PopoverProps } from "../../types";
import { Link } from "react-router-dom";

export type PopoverRefType2 = HTMLDivElement | null;

function Popover(
  props: PopoverProps,
  ref: React.ForwardedRef<HTMLDivElement | null>
) {
  const { className } = props;
  return (
    <div
      ref={ref}
      className={`position-absolute start-50 translate-middle rounded-5 bg-popover p-4 d-md-flex flex-column justify-content-center align-items-center ${className}`}
      style={{ width: "500px", height: "500px", zIndex: 10, top: "360px" }}
    >
      <div className="p-4 fs-1 text-center">Browse our products now.</div>

      <Link to="/store" className="btn btn-primary btn-hover">
        Learn more
      </Link>
    </div>
  );
}
export default forwardRef(Popover);
