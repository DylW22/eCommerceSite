import { Card, CardBody, CardTitle, CardText, CardImg } from "react-bootstrap";
import { FeaturedProduct } from "../../types";
export const FeaturedProductCard = (product: FeaturedProduct) => {
  return (
    //bg-custom1
    <Card className="p-2 m-0 w-100 h-100 shake-item">
      <CardTitle className="fw-bold p-0 m-0">{product.name}</CardTitle>
      <CardBody className="fw-bold py-1">{product.promo}</CardBody>
      <CardImg
        style={{ width: "120px", height: "120px" }}
        className="mx-auto"
        src={product.imgUrl}
        alt={product.name}
      />

      <CardText className="fw-bold my-3 p-0">
        <span className="m-0 p-0">Special price: </span>${product.featuredPrice}
      </CardText>
    </Card>
  );
};
