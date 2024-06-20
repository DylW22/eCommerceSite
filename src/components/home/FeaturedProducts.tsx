import { Col } from "react-bootstrap";
import { useRotatingItems } from "../../hooks/useRotatingItems";

interface FeaturedProduct {
  id: number;
  price: number;
  title: string;
}

export const FeaturedProducts = () => {
  let nMax: number = 3;

  let sampleData = [
    { id: 111, price: 123, title: "Item 0" },
    { id: 222, price: 231, title: "Item 1" },
    { id: 333, price: 333, title: "Item 2" },
    { id: 444, price: 236, title: "Item 3" },
    { id: 555, price: 345, title: "Item 4" },
    { id: 666, price: 231, title: "Item 5" },
    { id: 777, price: 242, title: "Item 6" },
    { id: 888, price: 452, title: "Item 7" },
    { id: 999, price: 994, title: "Item 8" },
  ];

  const products: FeaturedProduct[] = useRotatingItems(sampleData, nMax, 20000);
  return (
    <>
      {products &&
        products.map((product, index) => (
          <Col
            key={index}
            sm={12}
            md={3}
            className="bg-warning my-3 my-md-0 mb-md-4"
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "300px" }}
            >
              {product.title}
            </div>
          </Col>
        ))}
    </>
  );
};
