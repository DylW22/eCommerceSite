import React, { forwardRef } from "react"; //ForwardedRef, RefObject
import { PopoverProps } from "../../types";

export type PopoverRefType2 = HTMLDivElement | null;

function Popover(
  props: PopoverProps,
  ref: React.ForwardedRef<HTMLDivElement | null>
) {
  const { className } = props;
  return (
    <div
      ref={ref}
      className={`position-absolute start-50 translate-middle rounded-5 bg-popover p-4 d-md-flex ${className}`}
      style={{ width: "500px", height: "500px", zIndex: 10, top: "360px" }}
    >
      <div className="flex-grow-1 p-4 fs-1 m-auto text-center">
        This is a fake promotion! Click out of the popover for it to disappear,
        magic.
      </div>
    </div>
  );
}
export default forwardRef(Popover);
