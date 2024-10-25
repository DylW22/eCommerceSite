import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { useSubmit } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { LoaderData } from "../../types";
import { useTheme } from "../../context/ThemeContext";

export function SearchBar() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { q } = useLoaderData() as LoaderData;
  const { theme } = useTheme();
  const isLoading = navigation.state === "loading";

  const handleSearchChange = useDebounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isFirstSearch = q === "";
      submit(e.target.form, {
        replace: !isFirstSearch,
      });
    },
    300
  );

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
        type="search"
        placeholder="Search..."
        name="q"
        id="q"
        defaultValue={q}
        onChange={handleSearchChange}
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
