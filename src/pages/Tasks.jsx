import { styled } from "styled-components";

import TaskDetails from "../components/TaskDetails";
import Checklist from "../components/Checklist";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import { useGeneralTasksProvider } from "../contexts/GeneralTasksContext";
import SortingOptions from "../components/SortingOptions";
import { ImageInBackground } from "../components/ui/ImageInBackground";
import taskImg from "/src/assets/images/unDraw/tasks.svg";
import add_tasks from "/src/assets/images/unDraw/add_tasks.svg";
import { ButtonCreateTask } from "../components/ButtonCreateTask";

const StyledTasksPanel = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 2rem;
  height: 100%;
  /* overflow-y: auto; */
`;

const MainSpace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: max-content;
  padding: 0 1rem 0 2rem;
`;

const SecondarySpace = styled.div`
  position: relative;

  margin: 2rem;
  & .TaskDetails {
    box-shadow: var(--drop-shadow);
  }
`;

// const x = resolvePath("xyz", "tasks");
// console.log(x);

function Tasks() {
  const location = useLocation();

  const { selectedTaskId, tasks, isLoadingTasks } = useGeneralTasksProvider();

  // Display image if there are no tasks AND you are not in Trash
  const displayNoTasksBackground =
    tasks?.filter((task) => !task.inTrash).length <= 0 &&
    location?.state?.trash !== true;

  if (!displayNoTasksBackground)
    return (
      <StyledTasksPanel>
        <MainSpace>
          <SearchBar mode="url" searchParameters={["title"]} />
          <SortingOptions />
          {isLoadingTasks ? (
            <LoadingSpinner type="full" />
          ) : (
            <>
              <h2>
                {location.state?.trash === true ?? false
                  ? "Trash"
                  : "Checklist"}
              </h2>
              <Checklist
                // key={}
                dataManager={{
                  tasks,
                  isLoadingTasks,
                }}
                location={location}
              />
            </>
          )}
        </MainSpace>
        <SecondarySpace>
          {selectedTaskId && <TaskDetails />}
          <ImageInBackground
            text="Click on any task to display its details."
            imgURL={taskImg}
          />
        </SecondarySpace>
      </StyledTasksPanel>
    );

  if (displayNoTasksBackground)
    return (
      <>
        <ImageInBackground
          imgURL={add_tasks}
          text={
            <p>
              You have no tasks.
              <br />
              You can create one by clicking on button with <b>+</b> sign.
            </p>
          }
        >
          <ButtonCreateTask />
        </ImageInBackground>
      </>
    );
}

export default Tasks;
