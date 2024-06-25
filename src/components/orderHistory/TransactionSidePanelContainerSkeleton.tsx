import { ListGroup } from "react-bootstrap";

export const TransactionSidePanelContainerSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3].map((item) => (
        <ListGroup.Item
          key={item}
          style={{ height: "40px" }}
          className="text-center"
        >
          {" "}
        </ListGroup.Item>
      ))}
    </>
  );
};
