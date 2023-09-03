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
    props.$isDone === true
      ? css`
          color: var(--theme-white-300);
          background-color: var(--theme-black-200);
        `
      : css`
          color: var(--theme-white-100);
          background-color: var(--theme-black-250);
        `}
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
  border: 1px solid var(--theme-white-100);
  cursor: pointer;
  background-color: ${(props) => (props.$isDone ? "" : "transparent")};
`;

function Task({ children, id, title, description }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDone, setIsDone] = useState(false);

  function handleCheckout() {
    setIsDone((isDone) => !isDone);
  }

  const shortDescription = stringShortener(description);

  return (
    <StyledTask $isDone={isDone}>
      <Checkbox $isDone={isDone} onClick={handleCheckout}></Checkbox>
      <Details>
        <Title>{title}</Title>
        <Description>{isExpanded ? description : shortDescription}</Description>
      </Details>
    </StyledTask>
  );
}

export default Task;
