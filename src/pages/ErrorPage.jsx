import { useRouteError } from "react-router";

function PageNotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Error has occured!</h1>
      <h2>{error.status}</h2>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}

export default PageNotFound;
