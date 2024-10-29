import {
  FilterQueryLayout,
  ShoppingCartProviderLayout,
} from "../context/Layouts";
import { ThemeProviderLayout } from "../context/Layouts";
import { Root } from "../pages/Root";
import { loader as SearchBarLoader } from "../components/header/SearchBar";
import { Store } from "../pages/Store";
import { About } from "../pages/About";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { InvalidPath } from "../pages/InvalidPath";
import { action as LoginAction } from "../pages/Login";
import { action as RegisterAction } from "../pages/Register";
import { ProtectedRoute } from "../components/routing/ProtectedRoute";
import { Account } from "../pages/Account";
import { Checkout } from "../pages/Checkout";
import { Payment } from "../pages/Payment";
import { action as PaymentAction } from "../pages/Payment";
import { Home } from "../pages/Home";
import { ActionFunction, RouteObject } from "react-router-dom";
import { ErrorElement } from "../components/errors/ErrorElement.tsx";
import Success from "../pages/Success.tsx";

import { TitleChanger } from "../hooks/TitleChanger.tsx";
import TransactionIndex from "../components/history/TransactionIndex.tsx";
import TransactionLayout from "../components/history/TransactionLayout.tsx";

export const RoutesConfig = (appContext: any): RouteObject[] => {
  return [
    {
      //FilterQueryLayout
      element: <FilterQueryLayout />,
      children: [
        {
          element: <ShoppingCartProviderLayout />,
          children: [
            {
              element: <ThemeProviderLayout />,
              children: [
                {
                  path: "/",
                  errorElement: <ErrorElement />,
                  element: (
                    <TitleChanger>
                      <Root />
                    </TitleChanger>
                  ),
                  loader: SearchBarLoader,
                  id: "root",

                  children: [
                    {
                      index: true,
                      element: <Home />,
                    },
                    {
                      element: <Store />,
                      path: "/store",
                    },

                    {
                      element: <About />,
                      path: "/about",
                    },
                    {
                      element: (
                        <ProtectedRoute>
                          <Login />
                        </ProtectedRoute>
                      ),
                      path: "/login",
                      action: LoginAction(appContext) as ActionFunction,
                    },
                    {
                      element: (
                        <ProtectedRoute>
                          <Register />
                        </ProtectedRoute>
                      ),
                      path: "/register",
                      action: RegisterAction(appContext) as ActionFunction,
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
                        {
                          element: <TransactionLayout />,
                          path: "/history",
                          errorElement: <div>TransactionLayout Error</div>,

                          id: "history",
                          children: [
                            {
                              index: true,
                              errorElement: <div>TransactionListSkeleton</div>,

                              element: <TransactionIndex />,
                            },
                          ],
                        },
                        { element: <Checkout />, path: "/checkout" },
                        {
                          element: <Payment />,
                          path: "/payment",
                          action: PaymentAction(appContext) as ActionFunction,
                        },
                        {
                          element: <Success />,
                          path: "/success",
                        },
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
  ];
};
