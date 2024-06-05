import { Form } from "react-router-dom";
import { useSubmit } from "react-router-dom";
export function SearchBar() {
  const submit = useSubmit();
  return (
    <div>
      <Form role="search">
        <input
          placeholder="Search"
          type="Search"
          name="q"
          defaultValue={"1"}
          onChange={(event) => {
            submit(event.currentTarget.form);
          }}
        />
        <div hidden={true}></div>
        <div>Spare</div>
      </Form>
    </div>
  );
}
