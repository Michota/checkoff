import { useRouteError } from "react-router";
import styled from "styled-components";

const StyledErrorPage = styled.div`
  background-color: var(--theme-black-100);
  color: var(--theme-red);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

function PageNotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <StyledErrorPage>
      <span>
        <h2>Error has occured!</h2>
        <h1>{error.status}</h1>
        <p>{error.statusText || error.message}</p>
      </span>
    </StyledErrorPage>
  );
}

export default PageNotFound;
