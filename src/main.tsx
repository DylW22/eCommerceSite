import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
/*import {
  BrowserRouter,
  Router,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { Root } from "./pages/Root.tsx";
import { About } from "./pages/About.tsx";
import { Store } from "./pages/Store.tsx";
import { TestPage } from "./pages/TestPage.tsx";

import { Login } from "./pages/Login.tsx";
import { Register } from "./pages/Register.tsx";
import { Account } from "./pages/Account.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { Payment } from "./pages/Payment.tsx";
import { Checkout } from "./pages/Checkout.tsx";
import { InvalidPath } from "./pages/InvalidPath.tsx";
import { AuthLayout, RouterLayout } from "./context/Layouts.tsx";
import { ShoppingCartProviderLayout } from "./context/Layouts.tsx";
import { ThemeProviderLayout } from "./context/Layouts.tsx";
import { loader as SearchBarLoader } from "./components/SearchBar.tsx";
import { action as LoginAction } from "./components/LoginForm.tsx";
*/
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import client from "./apolloClient";
import { ApolloProvider } from "@apollo/client";
/*
const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <ShoppingCartProviderLayout />,
        children: [
          {
            element: <ThemeProviderLayout />,
            children: [
              {
                path: "/",
                element: <Root />,
                loader: SearchBarLoader,
                id: "root",
                children: [
                  {
                    element: <Store />,
                    path: "/store",
                  },

                  {
                    element: <About />,
                    path: "/about",
                  },
                  {
                    element: <TestPage />,
                    path: "/testpage",
                  },
                  {
                    element: <Login />,
                    path: "/login",
                    action: LoginAction,
                    //action: (authContext) => LoginAction(authContext),
                  },
                  {
                    element: <Register />,
                    path: "/register",
                  },
                  {
                    element: <InvalidPath />,
                    path: "*",
                  },
                  {
                    element: <ProtectedRoute />,
                    children: [
                      {
                        element: <Account />,
                        path: "/account",
                      },
                      { element: <Checkout />, path: "/checkout" },
                      { element: <Payment />, path: "/payment" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
*/
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <div className="">
          <App />
        </div>
      </AuthProvider>
    </ApolloProvider>
    {/*<RouterProvider router={router} />*/}
  </React.StrictMode>
);
