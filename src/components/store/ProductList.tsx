import React from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../cart/containers/StoreItem";
import EmptyStore from "./EmptyStore";
import { StoreItemSkeletonList } from "../cart/containers/StoreItemSkeletonList";
import { useQueryFilterContext } from "../../context/FilterQueryContext";

export const ProductList: React.FC = () => {
  const { filteredItems } = useQueryFilterContext();
  //if (filteredItems.length === 0) return <StoreItemSkeletonList count={6} />;

  return (
    <Row md={2} xs={1} lg={3} className="g-4 g-md-3">
      {filteredItems.length > 0 ? (
        filteredItems.map((product) => (
          <Col key={product.id} className="">
            <StoreItem {...product} />
          </Col>
        ))
      ) : (
        <EmptyStore />
      )}
    </Row>
  );
};
