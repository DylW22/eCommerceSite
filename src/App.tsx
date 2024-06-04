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
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { AuthProvider } from "./context/AuthContext";
import { Account } from "./pages/Account";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
function App() {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
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
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<InvalidPath />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </AuthProvider>
  );
}

export default App;
