import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_PRODUCTS } from "../../queries";

import { locationObject, StoreItemProps } from "../../types";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../cart/containers/StoreItem";
import EmptyStore from "./EmptyStore";
import { useRouteLoaderData } from "react-router-dom";
import { StoreItemSkeletonList } from "../cart/containers/StoreItemSkeletonList";
import { useQueryFilterContext } from "../../context/FilterQueryContext";

type QueryType = {
  getProducts: StoreItemProps[];
};

export const ProductList: React.FC = () => {
  const location = useRouteLoaderData("root") as locationObject;
  const { loading, data, error } = useQuery<QueryType>(GET_PRODUCTS);
  const { filteredItems, setItems, setQuery } = useQueryFilterContext();

  useEffect(() => {
    if (data?.getProducts) {
      setItems(data?.getProducts);
    }
    setQuery(location.q);
  }, [data, location]);

  if (loading) return <StoreItemSkeletonList count={6} />;
  if (error) return <div>Error</div>;

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
