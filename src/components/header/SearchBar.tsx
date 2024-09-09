import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { useSubmit } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { LoaderData } from "../../types";

export function SearchBar() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { q } = useLoaderData() as LoaderData;

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
    <Form className="px-4 w-50" role="search" method="get" action="/store">
      <input
        placeholder="Search"
        type="Search"
        name="q"
        id="q"
        defaultValue={q}
        onChange={handleSearchChange}
        className="rounded-pill px-3 py-2 w-100"
      />
      {isLoading && <div className="position-absolute">Loading..</div>}
    </Form>
  );
}

export function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  return { q };
}
