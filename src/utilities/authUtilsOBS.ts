// authUtils.ts (or any appropriate file name)
import { AuthContext } from "../context/AuthContext"; // Import your AuthContext from its location
import { useContext } from "react";
export function getTokenFromAuthContext() {
  const { token } = useContext(AuthContext) as any;
  return token;
}
