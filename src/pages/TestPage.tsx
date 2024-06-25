import { useBackgroundQuery, useReadQuery } from "@apollo/client";
import { GET_PAGINATED_TRANSACTIONS } from "../queries";
import { Suspense } from "react";
function SuspenseFallback() {
  return <div>Loading!!!!!!!!!!!!!!!</div>;
}

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

export function TestPage() {
  const [queryRef, moreData] = useBackgroundQuery(GET_PAGINATED_TRANSACTIONS, {
    variables: { limit: 1 },
  });

  return (
    <div>
      <Suspense fallback={<SuspenseFallback />}>
        <Child queryRef={queryRef} moreData={moreData} />
      </Suspense>
      ;
    </div>
  );
}

{
  /* const TestChild = () => {
return <div>I am a test Child</div>;
};
 */
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
