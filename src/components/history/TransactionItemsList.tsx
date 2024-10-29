import { getItemById } from "../../utilities/getItemById";
import { Row, Col } from "react-bootstrap";
import { TransactionItemsListProps } from "../../types";

export const TransactionItemsList: React.FC<TransactionItemsListProps> = ({
  items,
}) => {
  return items.map((item) => {
    const foundItem = getItemById(item.id); //28.10
    if (!foundItem) return null;
    const { name } = foundItem;
    return (
      <Row key={item.id} className="fs-8">
        <Col className="mx-2">{name}</Col>
      </Row>
    );
  });
};
