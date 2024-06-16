import { getItemById } from "../../utilities/getItemById";
import { Row, Col } from "react-bootstrap";
import { PastOrderItem } from "../../types";
type OrderedItemsListProps = {
  items: PastOrderItem[];
};

export const OrderedItemsList: React.FC<OrderedItemsListProps> = ({
  items,
}) => {
  return items.map((item) => {
    const foundItem = getItemById(item.id);
    if (!foundItem) return null;
    const { price, name } = foundItem;
    return (
      <Row key={item.id} className="fs-5">
        <Col className="text-center">{name}</Col>
        <Col className="text-center">{item.quantity}</Col>
        <Col className="text-center">{price}</Col>
      </Row>
    );
  });
};
