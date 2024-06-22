import { AccountDropDown } from "../components/header/AccountDropdown";

export function TestPage() {
  return (
    <div>
      <div>Test Page</div>
      <TestChild />
    </div>
  );
}

const TestChild = () => {
  return <div>I am a test Child</div>;
};

/* const childRefs = useRef([]);
  const scrollDown = (index: number) => {
    console.log(`Will scroll down to ${index}`);
    if (childRefs.current[index]) {
      childRefs.current[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  let items = [0, 1, 2, 3, 4];

  return (
    // <Navbar bg="light" expand="lg" className="sticky-top">

    <Container className="h-100">
      <Row className="h-100">
        <Col
          className="shadow-lg bg-white sticky-top "
          style={{
            top: "56px",
            padding: "0",
            height: "calc(100vh - 64px)",
          }} //Check these paddings and margins
          md={4}
        >
          <ul>
            {items &&
              items.map((item, index) => (
                <li key={index} onClick={() => scrollDown(index)}>
                  Child: {`${index}`}
                </li>
              ))}
          </ul>
        </Col>
        <Col md={8} className="p-4">
          <ChildPage items={items} childRefs={childRefs} />
        </Col>
      </Row>
    </Container>
  );
}
*/

/*
    <Container className="h-100">
      <Row className="h-100">
        <Col
          className="shadow-lg bg-white sticky-top "
          style={{
            top: "56px",
            padding: "0",
            height: "calc(100vh - 64px)",
          }} //Check these paddings and margins
          md={4}
        >
          <ul>
            {items &&
              items.map((item, index) => (
                <li key={index} onClick={() => scrollDown(index)}>
                  Child: {`${index}`}
                </li>
              ))}
          </ul>
        </Col>
        <Col md={8} className="p-4">
          {items &&
            items.map((item, index) => (
              <div
                className="bg-danger my-5"
                style={{ height: "600px" }}
                ref={(el) => (childRefs.current[index] = el)}
              >
                Child {`${index}`}
              </div>
            ))}
        </Col>
      </Row>
    </Container>
*/

{
  /*<div>
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
</div>*/
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
