import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { auth } from "./utilities/firebaseConfig.ts"; //"../..//utilities/firebaseConfig.ts";
import { onAuthStateChanged } from "firebase/auth";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/",
});

const errorLink = onError(({ networkError }) => {
  if (networkError) {
    console.log("Network error", networkError);
    throw new Error("Network is down.");
  }
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
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
