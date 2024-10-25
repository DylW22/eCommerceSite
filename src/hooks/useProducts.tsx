import { useEffect, useState } from "react";
import { StoreItemProps } from "../types";
import { ApolloError, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../queries";

interface useProductsFetchReturn {
  products: StoreItemProps[];
  loading: boolean;
  error: ApolloError | undefined;
}

type QueryType = {
  getProducts: StoreItemProps[];
};

const useProductsFetch = (): useProductsFetchReturn => {
  const [products, setProducts] = useState<StoreItemProps[]>([]);
  const { loading, data, error } = useQuery<QueryType>(GET_PRODUCTS);
  useEffect(() => {
    if (data?.getProducts) {
      setProducts(data?.getProducts);
    }
  }, [data]);

  return { products, loading, error };
};

export default useProductsFetch;
