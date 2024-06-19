import { Pagination } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
export function TestPage() {
  return (
    // <Navbar bg="light" expand="lg" className="sticky-top">
    <div>
      <div
        className=""
        style={{
          overflowY: "scroll",
          height: "calc(100vh- 56px)",
          paddingTop: "56px",
        }}
      >
        Test
      </div>
    </div>
  );
}

/*export function TestPage() {
  let active = 3;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Pagination>{items}</Pagination>
      <br />

      <Pagination size="lg">{items}</Pagination>
      <br />

      <Pagination size="sm">{items}</Pagination>
    </div>
  );
}
*/
