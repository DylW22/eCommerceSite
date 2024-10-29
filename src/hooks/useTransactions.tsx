import { useReadQuery, useQueryRefHandlers, QueryRef } from "@apollo/client";
import { useState, useEffect, useCallback } from "react";
import { TransactionsData } from "../types";

interface GetTransactionsResponse {
  getTransactions: TransactionsData[];
}
export interface CustomQueryRef<T> extends QueryRef<T> {
  reference: QueryRef<T>;
}

export const useTransactions = (
  queryRef: CustomQueryRef<GetTransactionsResponse>,
  limit: number
) => {
  const [transactions, setTransactions] = useState<TransactionsData[]>([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const { data } = useReadQuery<GetTransactionsResponse>(queryRef);
  const { fetchMore } = useQueryRefHandlers(queryRef);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (data && data.getTransactions) {
      setTransactions(data.getTransactions);
    }
  }, [data]);

  const fetchTransactions = useCallback(async () => {
    if (!hasMorePosts || isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await fetchMore({
        variables: {
          offset: transactions.length,
          limit: limit,
        },
      });

      const { getTransactions } = data;
      if (getTransactions.length < limit) {
        setHasMorePosts(false);
      }
      setTransactions((prev) => [...prev, ...getTransactions]);
    } catch (error) {
      console.log("Error fetching transactions: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchMore, hasMorePosts, isLoading, transactions.length, limit]);

  return {
    transactions,
    fetchTransactions,
    hasMorePosts,
    setHasMorePosts,
    isLoading,
  };
};
