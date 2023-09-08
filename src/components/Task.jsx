import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { styled, css } from "styled-components";
import stringShortener from "../utils/stringShortener";
import useUpdateTask from "./useTaskUpdate";
import Box from "../ui/Box";
// import Checkbox from "./Checkbox";

const StyledTask = styled(Box)`
  cursor: pointer;
  width: 28rem;
  gap: 1rem;
  align-items: center;

  ${(props) =>
    props.$isCompleted === true
      ? css`
          color: var(--theme-white-300);
          background-color: var(--theme-black-200);
        `
      : css`
          color: var(--theme-white-100);
          background-color: var(--theme-black-250);
        `};
`;

const StyledDescription = styled.p`
  font-size: 1.2rem;
`;

const StyledDetails = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
`;

const StyledTitle = styled.input`
  width: 100%;
  font-size: 1.6rem;
  /* opacity: ${(props) =>
    props.$isEmpty === true
      ? css`
          30%;
        `
      : css`
          initial;
        `}; */
`;

const StyledDateStart = styled.p`
  font-size: 1.4rem;
`;

const StyledCheckbox = styled.label`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isCompleted ? `var(--theme-white-100)` : "transparent"};

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  ${(props) => {
    const priority = props.$priority ?? 0;
    return `
    border: 0.1rem solid var(--priority-${priority});
    `;
  }}
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

// StyledCheckbox.defaultProps = {
//   type: "checkbox",
// };

/*
TODO: npm date-picker, zmień wyświetlany tekst daty na Tommorow, Yesterday, in Monday etc.
!
*/

const TaskContext = createContext();
// // * reducer
// function reducer(state, action) {
//   console.log(action);
//   switch (action.type) {
//     case "updateTitle":
//       return { ...state, title: action.payload };
//     case "updateCheckbox":
//       return { ...state, isCompleted: action.payload };
//   }
// }

function Task({ children, data, setSelectedTaskId, setState }) {
  // const [taskData, dispatch] = useReducer(reducer, data);

  // const valueProvider = { ...taskData, dispatch };

  function updateState(columnName, newData) {
    setState({ ...data, [columnName]: newData });
  }

  return (
    <StyledTask onClick={() => setSelectedTaskId(data.id)}>
      {/* // <StyledTask> */}
      {/* <Checkbox /> */}
      <StyledDetails>
        <Title title={data.title} updateState={updateState} />
        {/* <Description /> */}
      </StyledDetails>
    </StyledTask>
  );
}

// return (
//   <TaskContext.Provider value={valueProvider}>
//     {/* {!selectedTaskId && ( */}
//     <StyledTask onClick={() => updateState(data)}>
//       {/* <Checkbox /> */}
//       <StyledDetails>
//         <Title />
//         {/* <Description /> */}
//       </StyledDetails>
//     </StyledTask>
//     {/* )} */}
//     {/* {selectedTaskId && children} */}
//   </TaskContext.Provider>
// );
// }

// function Checkbox() {
//   const { priority, isCompleted, dispatch } = useContext(TaskContext);

//   return (
//     <StyledCheckbox
//       // TODO: checkboxes need to be inputs (?)
//       $priority={priority}
//       $isCompleted={isCompleted}
//     >
//       <HiddenCheckbox
//         aria-checked={isCompleted}
//         onClick={() =>
//           dispatch({ type: "updateCheckbox", payload: !isCompleted })
//         }
//       />
//     </StyledCheckbox>
//   );
// }

function Title({ className, title, updateState }) {
  // const { title, dispatch } = useContext(TaskContext);

  const isEmpty = title === "" || !title;

  return (
    <StyledTitle
      // ! change to value!!!
      onChange={(e) =>
        // dispatch({ type: "updateTitle", payload: e.target.value })
        updateState("title", e.target.value)
      }
      value={title}
      className={className}
      $isEmpty={isEmpty}
      placeholder="This task has no name..."
    />
  );
}

// function Description() {
//   const { description } = useContext(TaskContext);

//   return (
//     <>
//       {description && (
//         <StyledDescription>
//           {description.length > 32 ? stringShortener(description) : description}
//         </StyledDescription>
//       )}
//     </>
//   );
// }

// Task.Checkbox = Checkbox;
Task.Title = Title;
// Task.Description = Description;

export default Task;
