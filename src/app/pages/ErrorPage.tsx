import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  const errorText = isRouteErrorResponse(error) ? error.statusText : "Unknown Error"

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>

      {
        isRouteErrorResponse(error) &&
        <p>
          <i>{ errorText }</i>
        </p>
      }

    </div>
  );
}