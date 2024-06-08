import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { useSubmit } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce.tsx";

//https://molly1024.medium.com/%E5%A6%82%E4%BD%95%E5%9C%A8react%E5%B0%88%E6%A1%88%E4%BD%BF%E7%94%A8lodash-debounce-how-to-use-lodash-debounce-in-react-project-e56d85e0474f
//https://github.com/remix-run/react-router/issues/10263

interface LoaderData {
  q: string;
}
interface Event {
  target: HTMLInputElement;
}

export function SearchBar() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { q } = useLoaderData() as LoaderData;

  const isLoading = navigation.state === "loading";

  const handleSearchChange = useDebounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //console.log(e.target.value); // OK
      //Filter here

      const isFirstSearch = q === ""; // === null
      //console.log("isFirstSearch: ", isFirstSearch);
      submit(e.target.form, {
        replace: !isFirstSearch,
      });
    },
    300
  );

  return (
    <div>
      <Form className="px-4" role="search" method="get" action="/store">
        <input
          placeholder="Search"
          type="Search"
          name="q"
          id="q"
          defaultValue={q}
          onChange={handleSearchChange}
          className="rounded-pill px-3"
        />
        {isLoading && <div>Loading..</div>}
        {/*<div>Spare</div>*/}
      </Form>
    </div>
  );
}

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  return { q };
}
