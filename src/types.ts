import { CartItem } from "./context/ShoppingCartContext";
export type Item = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export type PastOrderItem = {
  id: number;
  quantity: number;
  itemId: number;
};
export type PastOrderCard = {
  orderDate: string;
  orderId: number;
  items: PastOrderItem[];
};

export interface ActionRequestProps {
  request: Request;
}

export type OrderData = {
  orderDate: string;
  orderId: number;
  items: CartItem[];
};

export type TransactionsLoaderObject = {
  data: [OrderData];
};

export type ItemsLoaderObject = {
  data: [Item];
};

export type HistoryLoaderObject = {
  data: PastOrderCard[];
  status: "success" | "failure";
  errors: Record<string, string>;
};

export type Country = {
  name: string;
  capital: string;
};

export type CountryLoaderObject = {
  data: Country[];
  // status: "success" | "failure";
  // errors: Record<string, string>;
};
