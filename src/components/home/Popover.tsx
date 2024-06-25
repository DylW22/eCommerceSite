import React, { forwardRef } from "react"; //ForwardedRef, RefObject
interface PopoverProps {
  className?: string;
}

export type PopoverRefType2 = HTMLDivElement | null;
/*
export const Popover = forwardRef(
  (props: PopoverProps, ref: React.ForwardedRef<HTMLDivElement | null>) => {
    const { className } = props;
    return (
      <div
        ref={ref}
        className={`position-absolute top-50 start-50 translate-middle rounded-5 bg-danger p-4 d-md-flex ${className}`}
        style={{ width: "500px", height: "500px", zIndex: 10 }}
      >
        <div className="flex-grow-1 bg-warning p-4">Inner</div>
      </div>
    );
  }
);
*/
function Popover(
  props: PopoverProps,
  ref: React.ForwardedRef<HTMLDivElement | null>
) {
  const { className } = props;
  return (
    <div
      ref={ref}
      className={`position-absolute top-50 start-50 translate-middle rounded-5 bg-danger p-4 d-md-flex ${className}`}
      style={{ width: "500px", height: "500px", zIndex: 10 }}
    >
      <div className="flex-grow-1 bg-warning p-4">Inner</div>
    </div>
  );
}
export default forwardRef(Popover);

/*
        <div
          ref={popoverRef}
          className="position-absolute top-50 start-50 translate-middle bg-danger p-4 d-flex"
          style={{ width: "500px", height: "500px", zIndex: 10 }}
        >
          <div className="flex-grow-1 bg-warning p-4">Inner</div>
        </div>
*/
