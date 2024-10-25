import { getItemById } from "../../utilities/getItemById";
import { Row, Col } from "react-bootstrap";
import { OrderedItemsListProps } from "../../types";

export const TransactionItemsList: React.FC<OrderedItemsListProps> = ({
  items,
}) => {
  return items.map((item) => {
    const foundItem = getItemById(String(item.id));
    if (!foundItem) return null;
    const { name } = foundItem;
    return (
      <Row key={item.id} className="fs-8">
        <Col className="mx-2">{name}</Col>
      </Row>
    );
  });
};
