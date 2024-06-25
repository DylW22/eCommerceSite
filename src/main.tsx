import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import client from "./apolloClient";
import { ApolloProvider } from "@apollo/client";
import { SymbolProvider } from "./context/SymbolContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <SymbolProvider>
          <div className="">
            <App />
          </div>
        </SymbolProvider>
      </AuthProvider>
    </ApolloProvider>
    {/*<RouterProvider router={router} />*/}
  </React.StrictMode>
);
