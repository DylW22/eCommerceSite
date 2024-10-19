import { useAuth } from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";
export const AccountDropDown = () => {
  const { logout } = useAuth();
  return (
    <Dropdown className="">
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Account
      </Dropdown.Toggle>
      <Dropdown.Menu className="m-0 p-0">
        <Dropdown.Item className="px-3" href="/account">
          Profile
        </Dropdown.Item>

        <Dropdown.Item href="/history" className="px-3">
          Past orders
        </Dropdown.Item>
        <Dropdown.Item className="px-3" onClick={logout}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
