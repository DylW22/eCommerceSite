import { useAuth } from "../context/AuthContext";
import { Dropdown } from "react-bootstrap";
export const AccountDropDown = () => {
  const { logout } = useAuth();
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Account
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="/account">Profile</Dropdown.Item>
        <Dropdown.Item href="/history">Past orders</Dropdown.Item>
        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
