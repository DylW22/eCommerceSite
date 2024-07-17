import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query Query {
    country(code: "US") {
      name
      capital
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountries($codes: [String!]!) {
    countries(filter: { code: { in: $codes } }) {
      code
      name
      capital
    }
  }
`;

export const GET_ITEMS = gql`
  query Query {
    getItems {
      name
      price
    }
  }
`;

export const GET_PAGINATED_TRANSACTIONS = gql`
  query GetPaginatedTrans($limit: Int, $startKey: String) {
    getPaginatedTransactions(limit: $limit, startKey: $startKey) {
      transactions {
        orderDate
        items {
          quantity
          itemId
          id
        }
      }
      lastKey
    }
  }
`;

//itemId removed from GET_TRANSACTIONS
export const GET_TRANSACTIONS = gql`
  query Query($offset: Int, $limit: Int) {
    getTransactions(offset: $offset, limit: $limit) {
      items {
        quantity
        id
      }
      orderDate
      orderId
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation Mutation($transactionItem: TransactionItemInput) {
    addTransaction(transactionItem: $transactionItem) {
      orderDate
      orderId
      items {
        quantity
        id
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      title
      content
    }
  }
`;
