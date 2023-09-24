import styled from "styled-components";
import { useTaskContext } from "../Task";

const StyledTitle = styled.input`
  margin-left: auto;
  width: 100%;
  font-size: 1.6rem;
`;

function Title({ className }) {
  const { title, updateState } = useTaskContext();
  const isEmpty = title === "" || !title;

  return (
    <StyledTitle
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        updateState("title", e.target.value);
      }}
      value={title}
      className={className}
      $isEmpty={isEmpty}
      placeholder="This task has no name..."
    />
  );
}

export default Title;
