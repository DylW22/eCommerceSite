import { ShoppingCartProviderLayout } from "../context/Layouts";
import { ThemeProviderLayout } from "../context/Layouts";
import { Root } from "../pages/Root";
import { loader as SearchBarLoader } from "../components/SearchBar";
import { Store } from "../pages/Store";
import { About } from "../pages/About";
import { TestPage } from "../pages/TestPage";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { InvalidPath } from "../pages/InvalidPath";
import { action as LoginAction } from "../pages/Login";
import { action as RegisterAction } from "../pages/Register";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Account } from "../pages/Account";
import { Checkout } from "../pages/Checkout";
import { Payment } from "../pages/Payment";
import { RedirectedRoute } from "../components/RedirectedRoute";
import { loader as HistoryLayoutLoader } from "../components/HistoryLayout";
//import { OrderHistory, loader as HistoryLoader } from "../pages/OrderHistory";
import { action as PaymentAction } from "../pages/Payment";
import { Home } from "../pages/Home";
import { HistoryLayout } from "../components/HistoryLayout";
import { Transaction } from "../components/Transaction";
import { HistoryIndex } from "../components/HistoryIndex";
//22, 23, 24. 78, 79
export const RoutesConfig = (appContext: any) => {
  return [
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
                  action: LoginAction(appContext),
                },
                {
                  element: (
                    <RedirectedRoute>
                      <Register />
                    </RedirectedRoute>
                  ),
                  path: "/register",
                  action: RegisterAction(appContext),
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
                      element: <HistoryLayout />,
                      path: "/history",
                      loader: HistoryLayoutLoader,
                      children: [
                        {
                          index: true,
                          element: <HistoryIndex />,
                        },
                        {
                          path: "/history/:orderId",
                          element: <Transaction />,
                        },
                      ],

                      //loader: HistoryLoader,
                    },
                    { element: <Checkout />, path: "/checkout" },
                    {
                      element: <Payment />,
                      path: "/payment",
                      action: PaymentAction(appContext),
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
