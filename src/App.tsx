import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { TestPage } from "./pages/TestPage";
import { InvalidPath } from "./pages/InvalidPath";
import { Checkout } from "./pages/Checkout";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Account } from "./pages/Account";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AppProviders from "./context/AppProviders";
import { Payment } from "./pages/Payment";
//https://github.com/remix-run/react-router/issues/9398
function App() {
  return (
    <AppProviders>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/testpage" element={<TestPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<InvalidPath />} />
        </Routes>
      </Container>
    </AppProviders>
  );
}

export default App;
