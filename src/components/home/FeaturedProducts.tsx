import { Col } from "react-bootstrap";
import { useRotatingItems } from "../../hooks/useRotatingItems";
import { getFeaturedProducts } from "../../utilities/getFeaturedProducts";
import { FeaturedProductCard } from "./FeaturedProduct";
import { FeaturedProduct } from "../../types";

export const FeaturedProducts = () => {
  const nMax: number = 3;

  const featuredProductsId = [
    {
      id: 1,
      featuredPrice: 11.1,
      promo: "A fun-filled book for all the family.",
    },
    { id: 2, featuredPrice: 222, promo: "A simple, cheap computer." },
    {
      id: 3,
      featuredPrice: 333,
      promo: "Get your high-quality, fresh bananas here.",
    },
  ];
  const featuredProducts = getFeaturedProducts(featuredProductsId);
  if (!featuredProducts.length) return;
  const products: FeaturedProduct[] = useRotatingItems(
    featuredProducts,
    nMax,
    20000
  );
  return (
    <>
      {products &&
        products.map((product, index) => (
          <Col
            key={index}
            sm={12}
            md={3}
            className="rounded-4 my-3 my-md-0 mb-md-4 shake-container"
          >
            {/* <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "300px" }}
            > */}
            <FeaturedProductCard {...product} />
            {/* </div> */}
          </Col>
        ))}
    </>
  );
};
