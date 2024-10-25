import { Row } from "react-bootstrap";
import CartItemSkeleton from "./CartItemSkeleton";

interface CartItemSkeletonListProps {
  count: number;
}

const CartItemSkeletonList: React.FC<CartItemSkeletonListProps> = ({
  count,
}: CartItemSkeletonListProps) => {
  return (
    <Row md={2} xs={1} lg={3} className="g-4 g-md-3">
      {Array.from({ length: count }).map((_, index) => (
        <CartItemSkeleton key={index} />
      ))}
    </Row>
  );
};

export default CartItemSkeletonList;
