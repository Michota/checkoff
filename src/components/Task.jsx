import { useState } from "react";
import { styled, css } from "styled-components";
import stringShortener from "../utils/stringShortener";

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

const Checkbox = styled.button`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background-color: ${(props) => (props.$isCompleted ? "" : "transparent")};

  ${(props) => {
    const priority = props.$priority;
    return `
      border: 1px solid var(--priority-${priority});
    `;
  }}
`;

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

  function handleCheckout() {}

  return (
    <StyledTask $isCompleted={isCompleted}>
      <DateStart>{}</DateStart>
      <Checkbox
        $priority={priority}
        $isCompleted={isCompleted}
        onClick={handleCheckout}
      ></Checkbox>
      <Details>
        <Title>{title}</Title>
        <Description>
          {isExpanded ? description : stringShortener(description ?? "")}
        </Description>
      </Details>
    </StyledTask>
  );
}

export default Task;
