import { Card, CardBody, CardTitle, CardText } from "react-bootstrap";
import { FeaturedProduct } from "../../types";
export const FeaturedProductCard = (product: FeaturedProduct) => {
  return (
    <Card className="p-5 m-0 w-100 h-100 bg-warning">
      <CardTitle className="fw-bold">{product.name}</CardTitle>
      <CardBody className="fw-bold">This is my body text!</CardBody>
      <CardText>Special price: {product.featuredPrice}</CardText>
    </Card>
  );
};
