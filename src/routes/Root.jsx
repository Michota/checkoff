import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Sidebar from "../components/Sidebar";
import SelectedTaskProvider from "../contexts/selectedTaskContext";

const StyledRoot = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--theme-black-100);
  color: var(--theme-white-100);
`;

const Main = styled.main`
  padding: 2rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

function Root() {
  return (
    <StyledRoot>
      <SelectedTaskProvider>
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </SelectedTaskProvider>
    </StyledRoot>
  );
}

export default Root;
