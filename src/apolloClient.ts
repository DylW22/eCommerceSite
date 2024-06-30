import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { auth } from "./utilities/firebaseConfig.ts"; //"../..//utilities/firebaseConfig.ts";
import { onAuthStateChanged } from "firebase/auth";
//import { AuthContext } from "./context/AuthContext";
//import { getTokenFromAuthContext } from "./utilities/authUtils.ts";
//import { measureExecutionTime } from "./utilities/measureExecutionTime.ts";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/",
});

const authLink = setContext(async (_, { headers }) => {
  const user = auth.currentUser;
  let token = null;
  if (user) {
    token = await user.getIdToken();
  } else {
    // Handle the case where the user is not immediately available
    token = await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdToken();
          //const token = await measureExecutionTime(() => user.getIdToken());
          resolve(token);
        } else {
          resolve(null);
        }
        unsubscribe();
      });
    });
  }
  //console.log("client side: token: ", token);
  return {
    headers: {
      ...headers,

      authorization: token ? `Bearer ${token}` : "",
    },
  };
  //const token = user ? wa
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),

  /*cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: {
            read(existing, _) {
              // A read function should always return undefined if existing is
              // undefined. Returning undefined signals that the field is
              // missing from the cache, which instructs Apollo Client to
              // fetch its value from your GraphQL server.
              return;
              //return existing && existing.slice(offset, offset + limit);
            },
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: [],
            merge(existing, incoming, _) {
              return;
            },
          },

          feed: {
            read(existing, { args: { offset, limit } }: any) {
              // A read function should always return undefined if existing is
              // undefined. Returning undefined signals that the field is
              // missing from the cache, which instructs Apollo Client to
              // fetch its value from your GraphQL server.
              return existing && existing.slice(offset, offset + limit);
            },
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: [],
            merge(existing, incoming, { args: { offset = 0 } }: any) {
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[offset + i] = incoming[i];
              }
              return merged;
            },
          },
        },
      },
    },
  }),*/
});

export default client;
