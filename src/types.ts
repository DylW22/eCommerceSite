//import { CartItem } from "./context/ShoppingCartContext";
import { ReactNode } from "react";
export type CartItem = {
  id: number;
  quantity: number;
};

export type Item = {
  //StoreItem
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

//obsolete
export type PastOrderItem = {
  id: number;
  quantity: number;
  itemId: number;
};

//obsolete
export type PastOrderCard = {
  orderDate: string;
  orderId: number;
  items: PastOrderItem[];
};

export interface ActionRequestProps {
  request: Request;
}

//Need to fix
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

export type ShoppingCartProviderProps = {
  children: ReactNode;
};

//AuthContext.tsx
export type AuthCartProviderProps = {
  children: ReactNode;
};

export interface UserData {
  uid: string | null;
  email: string | null;
  displayName: string | null;
}

export interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export type AuthState = {
  isAuthenticated: boolean;
  token: Tokens;
  userData: UserData | null;
  error: string | null;
};

export type AuthAction =
  | { type: "LOGIN"; userData: UserData; userTokens: Tokens }
  | { type: "LOGOUT" }
  | { type: "REGISTER"; userData: UserData }
  | { type: "SET_ERROR"; error: string };

export type AuthContextType = {
  state: AuthState;
  //login: (token: string, username: string, password: string) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  createAccount: (email: string, password: string) => void;
};

//SearchBar.tsx
export interface LoaderData {
  q: string;
}

//RedirectedRoute.tsx
export interface RouteProps {
  children: ReactNode;
}

//CartItem.tsx
export type CartItemsProps = {
  id: number;
  quantity: number;
};

//ShoppingCart.tsx
export type ShoppingCartProps = {
  isOpen: boolean;
};

export type ShoppingCartContextType = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  emptyCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

//StoreItem.tsx
export type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

//OrderedItemsList.tsx
export type OrderedItemsListProps = {
  items: transactionItem[];
};

//PastOrder.tsx
//obsolete
export type PastOrderProps = {
  order: PastOrderCard;
};

//TransactionNew.tsx
export type TransactionProps = {
  transaction: Transaction;
};

//Store.tsx
export type locationObject = {
  q: string;
};

//Login.tsx
export interface AppAction extends AuthContextType {
  //appContext: AuthContextType;
  login: (email: string, password: string) => Promise<void>;
}

//Register.tsx
export interface RegisterAction extends AuthContextType {
  // appContent: AuthContextType;
  createAccount: (email: string, password: string) => Promise<void>;
}

//HistoryLayout.tsx
export interface Transaction {
  items: transactionItem[];
  orderDate: string;
  orderId: number;
}

export type transactionItem = {
  //reduce(arg0: (total: any, item: any) => any, arg1: number): unknown;
  id: number;
  quantity: number;
  itemId: number;
};

/*export class CustomError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = "CustomError";
  }
}
*/
export interface IError {
  message: string;
  code?: string;
}

/*
export type Country = {
  name: string;
  capital: string;
};

export type CountryLoaderObject = {
  data: Country[];
  // status: "success" | "failure";
  // errors: Record<string, string>;
};
*/
