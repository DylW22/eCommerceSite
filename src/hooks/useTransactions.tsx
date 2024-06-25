import { useReadQuery, useQueryRefHandlers, QueryRef } from "@apollo/client";
import { useState, useEffect } from "react";
import { OrderData } from "../types";

interface GetTransactionsResponse {
  getTransactions: OrderData[];
}
export interface CustomQueryRef<T> extends QueryRef<T> {
  reference: QueryRef<T>;
}

export const useTransactions = (
  queryRef: CustomQueryRef<GetTransactionsResponse>,
  limit: number
) => {
  const [transactions, setTransactions] = useState<OrderData[]>([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const { data } = useReadQuery<GetTransactionsResponse>(queryRef);
  const { fetchMore } = useQueryRefHandlers(queryRef);

  useEffect(() => {
    if (data && data.getTransactions) {
      setTransactions(data.getTransactions);
    }
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await fetchMore({
        variables: {
          offset: transactions.length,
          limit: limit,
        },
      });
      const { getTransactions } = data;
      if (getTransactions.length < 1) {
        setHasMorePosts(false);
      }
      setTransactions((prev) => [...prev, ...getTransactions]);
    } catch (error) {
      console.log("Error! ", error);
    }
  };

  return {
    transactions,
    fetchTransactions,
    hasMorePosts,
    setHasMorePosts,
  };
};
