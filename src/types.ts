//import { FeaturedItemId } from "./types";
import { ApolloError } from "@apollo/client";
import { pathData } from "./data/pathData";
import { ReactNode } from "react";

//Oct19
export type CartItem = {
  id: string;
  quantity: number;
};

export interface ActionRequestProps {
  request: Request;
}

//Need to fix
export type OrderData = {
  //length: any;
  orderDate: string;
  orderId: number;
  items: CartItem[];
};

export type TransactionsLoaderObject = {
  data: [OrderData];
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
  newsletterSubscribed: boolean;
};

export type AuthAction =
  | { type: "LOGIN"; userData: UserData; userTokens: Tokens }
  | { type: "LOGOUT" }
  | { type: "REGISTER"; userData: UserData }
  | { type: "SET_ERROR"; error: string }
  | { type: "SUBSCRIBE_NEWSLETTER" }
  | { type: "DEFAULT" };

export type AuthContextType = {
  state: AuthState;
  //login: (token: string, username: string, password: string) => void;
  login: (
    username: string,
    password: string /*, authFirebase: string*/
  ) => void;
  logout: () => void;
  createAccount: (email: string, password: string) => void;
  subscribeToNewsletter: () => void;
};

//SearchBar.tsx
export interface LoaderData {
  q: string;
}

//RedirectedRoute.tsx
export interface RouteProps {
  children?: ReactNode;
}

//CartItem.tsx
export type CartItemsProps = {
  id: string;
  quantity: number;
  checkout: boolean;
};

//ShoppingCart.tsx
export type ShoppingCartProps = {
  isOpen: boolean;
};

//TitleChanger.ts
export interface TitleChangerProps {
  children?: ReactNode;
}

export type ValidPath = keyof typeof pathData;
export type PathData = {
  [key: string]: string;
};

export type ShoppingCartContextType = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  emptyCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

//StoreItem.tsx
//Oct19
export type StoreItemProps = {
  id: string;
  name: string;
  price: number;
  imgUrl?: string;
  category?: string;
};

//OrderedItemsList.tsx
export type OrderedItemsListProps = {
  items: TransactionItem[];
};

//TransactionNew.tsx
export type TransactionProps = {
  transaction?: OrderData; //OrderData
  loading: boolean;
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

export interface ChildRefsContext {
  current: HTMLLIElement | null;
}
/*
export interface ChildRefs {
  [x: string]: unknown; //any
  childRefs: React.MutableRefObject<HTMLInputElement[]>;
  //childRefs: HTMLInputElement[]; //React.MutableRefObject<HTMLLIElement[]>;
}
*/
export type TransactionItem = CartItem;
export interface IError {
  message: string;
  code?: string;
}

export type GetCurrentDateBasedOnLocale = (locale: string) => string;

export interface LoginFormProps {
  isSubmitting: boolean;
  referrer: string[];
}

export interface RegisterFormProps {
  isSubmitting: boolean;
}
type Rating = 0 | 1 | 2 | 3 | 4 | 5 | number;

export interface TestimonialItem {
  id: number;
  content: string;
  name: string;
  title: string;
  rating: Rating;
}

//FeaturedProducts.tsx
export type FeaturedProduct = StoreItemProps & {
  featuredPrice?: number;
  promo: string;
};

export interface FeaturedItemId {
  id: number;
  featuredPrice: number;
  promo: string;
}

export interface TestimonialProps {
  item: TestimonialItem;
}

//StarRating.tsx
export interface StarRatingProps {
  rating: number;
}

//getStars.tsx
export interface GetStarsProps {
  rating: number;
  totalStars: number;
}

export interface TransactionListProps {
  transactions: OrderData[];
  fetchTransactions: () => void;
  hasMorePosts: boolean;
  limit: number;
}

export interface DisplayTransactionsListProps {
  transactions?: OrderData[];
  loading: boolean;
  //  scrollDown: (index: number) => void;
}

export interface PopoverProps {
  className?: string;
}

export interface TransactionSidePanelContainerContentProps {
  transactions: OrderData[] | undefined;
  handleItemClick: (index: number) => void;
  activeIndex: number | null;
}

export interface redirectsInterface {
  [key: string]: {
    originRoutes: string[];
    redirectTo: string;
    requiresAuth: boolean;
  };
}

//Payment.tsx
export interface PaymentAction {
  status: "success" | "failure";
  errors: Record<string, string>;
}

export type PaymentFormData = {
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

//FilterQueryContext.tsx:
export type FilterQueryContextType = {
  filteredItems: StoreItemProps[];
  setFilteredItems: (items: StoreItemProps[]) => void;
  toggleFilter: (
    filterValue: StoreItemProps["category"] & AllowedQueries
  ) => void;
  clearFilter: () => void;
  activeFilters: AllowedQueries[];
  query: string;
  setQuery: (item: string) => void;
  products: StoreItemProps[];
  loading: boolean;
  error: ApolloError | undefined;
};

//
export type AllowedQueries = "food" | "electronics" | "book";
