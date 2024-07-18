import { Card, CardBody, CardTitle, CardText } from "react-bootstrap";
import { FeaturedProduct } from "../../types";
export const FeaturedProductCard = (product: FeaturedProduct) => {
  return (
    <Card className="py-5 px-2 m-0 w-100 h-100 bg-warning">
      <CardTitle className="fw-bold">{product.name}</CardTitle>
      <CardBody className="fw-bold">{product.promo}</CardBody>
      <img
        className="m-auto"
        src={product.imgUrl}
        width={"100px"}
        height={"100px"}
      />
      <CardText>
        <span className="fw-bold">Special price: </span>${product.featuredPrice}
      </CardText>
    </Card>
  );
};
