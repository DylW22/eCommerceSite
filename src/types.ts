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

export type TransactionsData = {
  orderDate: string;
  orderId: string;
  items: TransactionItem[];
};

export type TransactionsLoaderObject = {
  data: [TransactionsData];
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
  | { type: "UNSUBSCRIBE_NEWSLETTER" }
  | { type: "DEFAULT" };

export type AuthContextType = {
  state: AuthState;
  //login: (token: string, username: string, password: string) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  createAccount: (email: string, password: string) => void;
  subscribeToNewsletter: () => void;
  unsubscribeNewsletter: () => void;
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
export type TransactionItemsListProps = {
  items: TransactionItem[];
};

//TransactionCard.tsx
export type TransactionProps = {
  transaction?: TransactionsData; //TransactionsData
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

//28.10
// export interface ChildRefsContext {
//   current: HTMLLIElement | null;
// }

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
  id: string;
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
  id: string;
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

// export interface TransactionListProps {
//   transactions: TransactionsData[];
//   fetchTransactions: () => void;
//   hasMorePosts: boolean;
//   limit: number;
// }

export interface PopoverProps {
  className?: string;
  setIsOpen: (state: boolean) => void;
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

export interface GetTransactionsResponse {
  getTransactions: TransactionsData[];
}
