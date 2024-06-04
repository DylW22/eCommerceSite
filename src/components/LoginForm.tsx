import { useAuth } from "../context/AuthContext";
export function LoginForm() {
  const { login, state, logout } = useAuth();
  const { isAuthenticated } = state;

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login("abc")}>Login</button>
      )}
    </div>
  );
}

/*
    return (
      <Container className="d-flex">
        <Button>
          <Nav.Link to="/login" as={NavLink}>
            Login
          </Nav.Link>
        </Button>
        <Button>
          <Nav.Link to="/register" as={NavLink}>
            Create account
          </Nav.Link>
        </Button>
      </Container>
    );
  */
