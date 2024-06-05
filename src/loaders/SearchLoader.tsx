export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  console.log("Q params: ", q);

  return "Success";
}
