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
