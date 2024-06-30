import { getItemById } from "../../utilities/getItemById";
import { Row, Col } from "react-bootstrap";
import { OrderedItemsListProps } from "../../types";
//import { useState, useEffect } from "react";

export const TransactionItemsList: React.FC<OrderedItemsListProps> = ({
  items,
}) => {
  //const [renderCount, setRenderCount] = useState(0);
  /*   console.log("TransactionItemsList re-rendering");
  console.log("Transaction items: ", items);
  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, []); */
  return items.map((item) => {
    const foundItem = getItemById(item.id);
    if (!foundItem) return null;
    const { name } = foundItem;
    return (
      <Row key={item.id} className="fs-8">
        <Col className="mx-2">{name}</Col>
      </Row>
    );
  });
};
