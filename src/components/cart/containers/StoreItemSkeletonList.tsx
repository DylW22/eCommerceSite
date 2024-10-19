import { Row } from "react-bootstrap";
import StoreItemSkeleton from "./StoreItemSkeleton";

interface StoreItemSkeletonListProps {
  count: number;
}

export const StoreItemSkeletonList: React.FC<StoreItemSkeletonListProps> = ({
  count,
}: StoreItemSkeletonListProps) => {
  return (
    <Row md={2} xs={1} lg={3} className="g-4 g-md-3">
      {Array.from({ length: count }).map((_, index) => (
        <StoreItemSkeleton key={index} />
      ))}
    </Row>
  );
};
