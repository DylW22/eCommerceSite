import { ShoppingCartProviderLayout } from "../context/Layouts";
import { ThemeProviderLayout } from "../context/Layouts";
import { Root } from "../pages/Root";
import { loader as SearchBarLoader } from "../components/header/SearchBar";
import { Store } from "../pages/Store";
import { About } from "../pages/About";
import { TestPage } from "../pages/TestPage";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { InvalidPath } from "../pages/InvalidPath";
import { action as LoginAction } from "../pages/Login";
import { action as RegisterAction } from "../pages/Register";
import { ProtectedRoute } from "../components/routing/ProtectedRoute";
//import { ProtectedRoute } from "../components/ProtectedRoute";
import { Account } from "../pages/Account";
import { Checkout } from "../pages/Checkout";
import { Payment } from "../pages/Payment";
import { RedirectedRoute } from "../components/routing/RedirectedRoute";
import {
  loader as HistoryLayoutLoader,
  TransactionLayout,
} from "../components/orderHistory/TransactionLayout";
//import { OrderHistory, loader as HistoryLoader } from "../pages/OrderHistory";
import { action as PaymentAction } from "../pages/Payment";
import { Home } from "../pages/Home";
//import { Transaction } from "../components/orderHistory/Transaction";
import { HistoryIndex } from "../pages/HistoryIndex";
import { ActionFunction, RouteObject } from "react-router-dom";
//import { Profiler } from "react";
//import { onRender } from "../utilities/onRender";
//22, 23, 24. 78, 79
export const RoutesConfig = (appContext: any): RouteObject[] => {
  return [
    {
      element: <ShoppingCartProviderLayout />,
      children: [
        {
          element: <ThemeProviderLayout />,
          children: [
            {
              path: "/",
              element: (
                <div className="">
                  <Root />
                </div>
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
                  element: <TestPage />,
                  path: "/testpage",
                },
                {
                  element: (
                    <RedirectedRoute>
                      <Login />
                    </RedirectedRoute>
                  ),
                  path: "/login",
                  action: LoginAction(appContext) as ActionFunction,
                },
                {
                  element: (
                    <RedirectedRoute>
                      <Register />
                    </RedirectedRoute>
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
                      element: (
                        //         <Profiler id="transactionLayout" onRender={onRender}>
                        <TransactionLayout />
                        //       </Profiler>
                      ),
                      path: "/history",
                      loader: HistoryLayoutLoader,
                      id: "history",
                      children: [
                        {
                          index: true,
                          element: (
                            //         <Profiler id="historyIndex" onRender={onRender}>
                            <HistoryIndex />
                            //       </Profiler>
                          ),
                        },
                        /*    {
                          path: "/history/:orderId",
                          element: <Transaction />,
                        },*/
                      ],

                      //loader: HistoryLoader,
                    },
                    { element: <Checkout />, path: "/checkout" },
                    {
                      element: <Payment />,
                      path: "/payment",
                      action: PaymentAction(appContext) as ActionFunction,
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
