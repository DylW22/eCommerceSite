import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    // uri: "https://countries.trevorblades.com/graphql",
    uri: "http://localhost:3000/",
  }),
  cache: new InMemoryCache(),
});

export default client;
