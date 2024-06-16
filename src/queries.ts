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

export const GET_TRANSACTIONS = gql`
  query Query {
    getTransactions {
      items {
        quantity
        id
        itemId
      }
      orderDate
      orderId
    }
  }
`;

export interface Country {
  name: String;
  capital: String;
}

export interface GetDataQuery {
  country: Country[];
}
