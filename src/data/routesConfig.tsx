import { ShoppingCartProviderLayout } from "../context/Layouts";
import { ThemeProviderLayout } from "../context/Layouts";
import { Root } from "../pages/Root";
import { loader as SearchBarLoader } from "../components/header/SearchBar";
import { Store } from "../pages/Store";
import { About } from "../pages/About";
import { TestPage4 } from "../pages/TestPage4.tsx";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { InvalidPath } from "../pages/InvalidPath";
import { action as LoginAction } from "../pages/Login";
import { action as RegisterAction } from "../pages/Register";
import { ProtectedRoute } from "../components/routing/ProtectedRoute";
import { Account } from "../pages/Account";
import { Checkout } from "../pages/Checkout";
import { Payment } from "../pages/Payment";
//import { RedirectedRoute } from "../components/routing/RedirectedRoute";
import { action as PaymentAction } from "../pages/Payment";
import { Home } from "../pages/Home";

import { ActionFunction, RouteObject } from "react-router-dom";
import { Suspense } from "react";
import { TransactionLayout } from "../components/orderHistory/TransactionLayout.tsx";
import { TransactionIndex } from "../pages/TransactionIndex.tsx";
import { ErrorElement } from "../components/errors/ErrorElement.tsx";
import Success from "../pages/Success.tsx";

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
              errorElement: <ErrorElement />,
              element: <Root />,
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
                    <Suspense fallback={<div>Yelllow</div>}>
                      <TestPage4 />
                    </Suspense>
                  ),
                  path: "/testpage",
                  //    loader: loader,
                },
                {
                  element: (
                    //  <RedirectedRoute>
                    <ProtectedRoute>
                      <Login />
                    </ProtectedRoute>
                    // </RedirectedRoute>
                  ),
                  path: "/login",
                  action: LoginAction(appContext) as ActionFunction,
                },
                {
                  element: (
                    // <RedirectedRoute>
                    <ProtectedRoute>
                      <Register />
                    </ProtectedRoute>
                    // </RedirectedRoute>
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
                        //       <Suspense fallback={<div>Loading layout</div>}>
                        <TransactionLayout />
                        //     </Suspense>
                        //       </Profiler>
                      ),
                      path: "/history",

                      id: "history",
                      children: [
                        {
                          index: true,
                          errorElement: <div>Error</div>,
                          element: (
                            //         <Profiler id="historyIndex" onRender={onRender}>
                            //<div>Index</div>

                            //                            <Suspense
                            //                          fallback={<div>Loading TransactionIndex</div>}
                            //                      >
                            <TransactionIndex />
                            //                          </Suspense>
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
  ];
};
