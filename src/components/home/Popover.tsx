import React, { forwardRef, useEffect } from "react"; //ForwardedRef, RefObject
import { PopoverProps } from "../../types";
import { Link } from "react-router-dom";
import { useFadeout } from "../../hooks/useFadeout";

// export type PopoverRefType2 = HTMLDivElement | null;

function Popover(
  props: PopoverProps,
  ref: React.ForwardedRef<HTMLDivElement | null>
) {
  const { className, setIsOpen } = props;
  const { toFade, applyFade } = useFadeout(5500);
  const closePopover = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (!toFade) {
      applyFade();
    } else {
      setIsOpen(false);
    }
  }, [toFade]);

  return (
    <div
      ref={ref}
      className={`shadow-lg position-absolute start-50 translate-middle rounded-5 bg-popover p-4 d-md-flex flex-column justify-content-center align-items-center ${className}`}
      style={{
        width: "500px",
        height: "500px",
        zIndex: 10,
        top: "360px",
      }}
    >
      <button
        style={{ right: "20px", top: "10px" }}
        className="btn btn-primary btn-hover position-absolute rounded-5"
        onClick={closePopover}
      >
        X
      </button>
      <div className="p-4 fs-1 text-center">Browse our products now.</div>

      <Link to="/store" className="btn btn-primary btn-hover">
        Learn more
      </Link>
    </div>
  );
}

/*
    <div
      ref={ref}
      className={`shadow-lg position-absolute start-50 translate-middle rounded-5 bg-popover p-4 d-md-flex flex-column justify-content-center align-items-center ${className}`}
      style={{ width: "500px", height: "500px", zIndex: 10, top: "360px" }}
    >
      <button onClick={closePopover}>Here</button>
      <div className="p-4 fs-1 text-center">Browse our products now.</div>

      <Link to="/store" className="btn btn-primary btn-hover">
        Learn more
      </Link>
    </div>
*/

export default forwardRef(Popover);
