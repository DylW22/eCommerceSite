import { AccountDropDown } from "../components/header/AccountDropdown";
import { useBackgroundQuery, useReadQuery, useQuery } from "@apollo/client";
import { GET_PAGINATED_TRANSACTIONS } from "../queries";
import { Suspense } from "react";
import { gql } from "@apollo/client";
import { useTheme } from "../context/ThemeContext";
import { useDynamicBackground } from "../hooks/useDynamicBackground";
function SuspenseFallback() {
  return <div>Loading...</div>;
}

const FEED_QUERY = gql`
  query Feed($offset: Int, $limit: Int) {
    feed(offset: $offset, limit: $limit) {
      id
      # ...
    }
  }
`;

function Child({ queryRef, moreData }: any) {
  const queryData = useReadQuery(queryRef) as any;
  const { data } = queryData;
  console.log("queryData: ", queryData);
  //console.log("fetchMore", fetchMore.fetchMore);
  const { fetchMore } = moreData;

  const handleFetchMore = () => {
    fetchMore({
      variables: {
        limit: 2, // Update the limit as needed
        //startKey: data?.getTransactions?.lastKey, // Pass the lastKey from the current data
      },
      /*  updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;
        return {
          getTransactions: {
            ...prev.getTransactions,
            transactions: [
              ...prev.getTransactions.transactions,
              ...fetchMoreResult.getTransactions.transactions,
            ],
            lastKey: fetchMoreResult.getTransactions.lastKey,
          },
        };
      },*/
    });
  };

  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <button onClick={handleFetchMore}>Fetch more</button>
    </div>
  );
}

export function TestPage2() {
  const { styles } = useDynamicBackground();
  const { loading, data, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  if (loading) return "Loading...";
  console.log("data.feed: ", data.feed);
  return (
    <div
      style={{
        height: "calc(100vh - 80px)",
        background: `linear-gradient(to right, ${styles})`,
      }}
      className="m-0 p-4 fw-bold fs-1"
    >
      <button
        onClick={() =>
          fetchMore({
            variables: {
              offset: data.feed.length,
            },
          })
        }
      >
        Fetch more
      </button>
    </div>
  );
}

/*
    <Container
      fluid
      style={{
        height: "calc(100vh - 80px)",
        background: `linear-gradient(to right, ${styles})`,
      }}
      className="m-0 p-4 fw-bold fs-1"
    >
      This is a fake e-commerce site
    </Container>
*/

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
