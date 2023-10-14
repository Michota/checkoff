import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Sidebar from "../components/Sidebar";
import { GeneralTasksProvider } from "../contexts/GeneralTasksContext";
import { SettingsProvider } from "../contexts/SettingsContext";

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
`;

function Root() {
  return (
    <StyledRoot>
      <SettingsProvider>
        <Sidebar />
        <GeneralTasksProvider>
          <Main>
            <Outlet />
          </Main>
        </GeneralTasksProvider>
      </SettingsProvider>
    </StyledRoot>
  );
}

export default Root;
