import { Button, Stack } from "react-bootstrap";

const CartItemSkeleton: React.FC = () => {
  return (
    <Stack
      direction="horizontal"
      gap={2}
      className={`d-flex align-items-center`}
    >
      <div
        className="product-skeleton-text"
        style={{ width: "125px", height: "75px" }}
      />
      <div className="me-auto">
        <div className="product-skeleton-text mb-2">{""}</div>
        <div className="product-skeleton-text">{""}</div>
      </div>
      <div className={``}>{""}</div>
      <Button variant="outline-danger" size="sm">
        &times;
      </Button>
    </Stack>
  );
};

export default CartItemSkeleton;
