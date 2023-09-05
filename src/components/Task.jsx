import { useState } from "react";
import { styled, css } from "styled-components";
import stringShortener from "../utils/stringShortener";
import { useUpdateTaskComplete } from "./useTaskUpdate";

const StyledTask = styled.div`
  cursor: pointer;
  padding: 1rem;
  font-size: 1.6rem;
  width: 28rem;
  max-height: 12rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: var(--deafult-radius);
  box-shadow: var(--drop-shadow);

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

const Description = styled.p`
  font-size: 1.2rem;
`;

const Details = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
`;

const Title = styled.p`
  font-size: 2rem;
`;

const DateStart = styled.p`
  font-size: 1.4rem;
`;

const Checkbox = styled.button`
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

/*
TODO: npm date-picker, zmień wyświetlany tekst daty na Tommorow, Yesterday, in Monday etc.
!
*/

function Task({ task: taskData }) {
  const {
    isCompleted,
    title,
    description,
    id,
    priority,
    startDate,
    endDate,
    status,
  } = taskData;
  const [isExpanded, setIsExpanded] = useState(false);
  const { updateTask, isUpdating } = useUpdateTaskComplete();

  return (
    <StyledTask $isCompleted={isCompleted}>
      <Checkbox
        $priority={priority}
        $isCompleted={isCompleted}
        onClick={() => updateTask({ id, isCompleted })}
      ></Checkbox>
      <Details>
        <Title>{title}</Title>
        {description && (
          <Description>
            {isExpanded ? description : stringShortener(description ?? "")}
          </Description>
        )}
        {startDate && (
          <DateStart>📅 {new Date(startDate).toLocaleDateString()}</DateStart>
        )}
      </Details>
    </StyledTask>
  );
}

export default Task;
