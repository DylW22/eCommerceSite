import { useReadQuery, createQueryPreloader, QueryRef } from "@apollo/client";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_TRANSACTIONS } from "../queries";
import client from "../apolloClient";
//import { Container } from "react-bootstrap";
import { OrderData } from "../types";
const preloadQuery = createQueryPreloader(client);
//const preloadedQueryRef = preloadQuery(GET_TRANSACTIONS);

type QueryRefType = QueryRef<GetTransactionsResponse>;
interface GetTransactionsResponse {
  getTransactions: OrderData[];
}
type LoaderFunction = () => Promise<QueryRefType>;

export function TestPage3() {
  const [transactions, setTransactions] = useState<OrderData[]>([]);
  const queryRef = useLoaderData() as QueryRefType;
  const { data } = useReadQuery<GetTransactionsResponse>(queryRef);
  const [key, setKey] = useState<number | null>(null);
  const limit = 2;
  //Pagination
  //https://chatgpt.com/c/6ba7ddb0-957d-4e53-979d-4d14f2940dc7
  useEffect(() => {
    if (data && data?.getTransactions) {
      setTransactions(data.getTransactions);
      console.log("trans: ", data.getTransactions);
      setKey(data.getTransactions[limit - 1].orderId);
    }
  }, [data]);

  const handleNext = () => {
    if (!key) return;

    const nextItemStart = transactions.findIndex(
      (item) => key === item.orderId
    );
    if (nextItemStart === -1) return;
    console.log("nextItemStart: ", nextItemStart);
    /* const nextItems = transactions.slice(
      nextItemStart + 1,
      nextItemStart + limit + 1
    );*/
    const nextItems = transactions.slice(0);
    console.log("nextItems: ", nextItems);

    if (nextItems.length < 1) return; // Not enough items for pagination
    if (nextItems.length === 1) {
      console.log("final item: ", nextItems);
      setKey(nextItems[0]?.orderId);
    } else {
      setKey(nextItems[limit - 1]?.orderId || null);
    }
  };
  console.log("Key: ", key);
  const startItemIndex = transactions.findIndex((item) => key === item.orderId);
  const dataToDisplay = transactions.slice(
    startItemIndex,
    startItemIndex + limit
  );
  return (
    /*<Container
      fluid
      className="bg-white p-0 m-0"
      style={{
        height: "calc(100vh - 72px)",
      }}
    >*/

    <div>
      {dataToDisplay &&
        dataToDisplay.map((transaction) => (
          <div key={transaction.orderId}>{transaction.orderId}</div>
        ))}
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export const loader: LoaderFunction = async () => {
  const queryRef = await preloadQuery<GetTransactionsResponse>(
    GET_TRANSACTIONS
  ).toPromise();
  return queryRef;
};

/*export function TestPage3() {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <SuspendedChildV2 />
    </Suspense>
  );
}
const SuspendedChildV2 = () => {
  const [transactions, setTransactions] = useState([]);
  const { symbol } = useSymbol();

  const { data } = useReadQuery(symbol);

  useEffect(() => {
    if (symbol && data?.getTransactions) {
      console.log(symbol);
      setTransactions(data?.getTransactions);
    }
  }, [data]);

  return <div>loaded</div>;
};
*/
/*
  useEffect(() => {
    console.log("data: ", data);
    setTransactions(data?.getTransactions);
  }, [data]);*/

/*const myRef = useOutletContext<QueryRef>();
  const { data } = useReadQuery(myRef);

  useEffect(() => {
    setTransactions(data?.getTransactions);
  }, [data]);*/

/*return (
    <>
      <div>
        Hello
        {transactions.map((transaction) => (
          <div key={transaction.orderId}>{transaction.orderDate}</div>
        ))}
      </div>
    </>
  ); */

// preloadedQuery
/*const preloadedQuery = createQueryPreloader(client);
const preloadedQueryRef = preloadedQuery(GET_POSTS);

export function TestPage3() {
  //const { data } = useReadQuery(preloadedQueryRef);
  //console.log("data: ", data);
  return <div>Hello</div>;
}*/

// useBackgroundQuery /w useSuspended query, suspended state
/*export function TestPage3() {
  const [queryRef] = useBackgroundQuery(GET_POSTS); //has fetchMore and refetch
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <SuspendedChild2 queryRef={queryRef} />
    </Suspense>
  );
}
const SuspendedChild2 = ({ queryRef }) => {
  const { data } = useSuspenseQuery(GET_POSTS); //has fetchMore and refetch

  return (
    <>
      Name: {data.getPosts[0].title}
      <Suspense fallback={<div>Loading Grandchild...</div>}>
        <Grandchild queryRef={queryRef} />
      </Suspense>
    </>
  );
};
const Grandchild = ({ queryRef }) => {
  const { data } = useReadQuery(queryRef);
  console.log(data.getPosts);
  return data.getPosts.map(({ title, id }) => (
    <div key={id}>Post title: {title}</div>
  ));
};
*/
/*
//useSuspenseQuery w/ ErrorBoundary
export function TestPage3() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong..</div>}>
      <Suspense fallback={<div>Loading..</div>}>
        <SuspendedChild />
      </Suspense>
    </ErrorBoundary>
  );
}
const SuspendedChild = () => {
  const [posts, setPosts] = useState([]);
  const { data } = useSuspenseQuery(GET_POSTS);
  useEffect(() => {
    if (data && data?.getPosts) {
      setPosts(data?.getPosts);
    }
  }, [data?.getPosts]);

  return <div>{JSON.stringify(posts)}</div>;
};

const ErrorBoundary = ({ fallback, children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleErrors = (error, errorInfo) => {
      setHasError(true);
    };

    // Adding an event listener for uncaught errors
    const originalError = console.error;
    console.error = (...args) => {
      handleErrors(...args);
      originalError.apply(console, args);
    };

    return () => {
      // Cleaning up the error listener
      console.error = originalError;
    };
  }, []);

  if (hasError) {
    return fallback;
  }

  return children;
};
*/
//useQuery
/*export function TestPage3() {
  const [posts, setPosts] = useState([]);
  const { loading, error, data } = useQuery(GET_POSTS, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data && data?.getPosts) {
      setPosts(data?.getPosts);
    }
  }, [data?.getPosts]);

  return <div>{JSON.stringify(posts)}</div>;
}
*/

/*
const POSTS_QUERY = gql`
  query Feed($offset: Int, $limit: Int) {
    feed(offset: $offset, limit: $limit) {
      id
      # ...
    }
  }
`;
*/
