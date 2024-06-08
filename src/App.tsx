//https://github.com/remix-run/react-router/issues/9398
import { useRoutesConfig } from "./hooks/useRoutesConfig";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const newRoutesConfig = useRoutesConfig();
  const router = createBrowserRouter(newRoutesConfig);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
