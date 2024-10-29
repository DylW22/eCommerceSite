import {
  Form,
  useLoaderData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { useSubmit } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { LoaderData } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import { useQueryFilterContext } from "../../context/FilterQueryContext";

export function SearchBar() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const location = useLocation();
  const { q } = useLoaderData() as LoaderData;
  const { theme } = useTheme();
  const isLoading = navigation.state === "loading";

  const { setQuery } = useQueryFilterContext();
  const [inputValue, setInputValue] = useState(q);

  const handleSearchChange = useDebounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isFirstSearch = q === "";
      submit(e.target.form, {
        replace: !isFirstSearch,
      });
    },
    300
  );

  useEffect(() => {
    if (location.pathname === "/store") {
      setInputValue(q);
    } else {
      setInputValue("");
      setQuery("");
    }
  }, [location.pathname, setQuery, q]);
  return (
    <Form
      className="px-2 w-100 search-box"
      role="search"
      method="get"
      action="/store"
    >
      <button
        aria-label="Search"
        className={`btn-search ${theme === "dark" ? "dark" : ""}`}
      >
        <i className="fas fa-search" aria-hidden="true"></i>
      </button>
      <input
        className={`input-search ${theme === "dark" ? "dark" : ""}`}
        type="text"
        placeholder="Search..."
        name="q"
        id="q"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value); // Update state
          handleSearchChange(e); // Trigger debounce
        }}
      />
      {isLoading && (
        <div role="status" aria-live="polite" className="position-absolute">
          Loading..
        </div>
      )}
    </Form>
  );
}

export function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  return { q };
}
