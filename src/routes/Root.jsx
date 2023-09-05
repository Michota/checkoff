import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Sidebar from "../components/Sidebar";

const StyledRoot = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  width: 100vw;
  height: 100vh;
  background-color: var(--theme-black-200);
  color: var(--theme-white-100);
`;

const Main = styled.main`
  padding: 2rem;
`;

function Root() {
  return (
    <StyledRoot>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}

export default Root;
