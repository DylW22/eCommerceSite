import { OrderData } from "../../types";
import { ListGroup } from "react-bootstrap";

interface TransactionSidePanelContainerContentProps {
  transactions: OrderData[] | undefined;
  handleItemClick: (index: number) => void;
  activeIndex: number | null;
}

export const TransactionSidePanelContainerContent: React.FC<
  TransactionSidePanelContainerContentProps
> = ({ transactions, handleItemClick, activeIndex }) => {
  return (
    ((transactions && transactions?.length) ?? 0) > 0 &&
    (transactions || []).map((transaction, index) => (
      <ListGroup.Item
        onClick={() => handleItemClick(index)}
        key={transaction.orderId}
        action
        active={activeIndex === index}
        className="text-center"
      >
        {transaction.orderDate}
        <span className="d-none d-lg-inline">
          , orderId: {transaction.orderId}
        </span>
      </ListGroup.Item>
    ))
  );
};
