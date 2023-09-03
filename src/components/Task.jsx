import { useState } from "react";
import { styled, css } from "styled-components";
import stringShortener from "../utils/stringShortener";

const StyledTask = styled.div`
  cursor: pointer;
  padding: 1rem;
  font-size: 1.6rem;
  background-color: var(--theme-black-300);
  width: 28rem;
  max-height: 12rem;
  display: grid;
  grid-template-columns: min-content 1fr;
  overflow: hidden;
  border-radius: var(--deafult-radius);

  ${(props) =>
    props.$isDone === "true" &&
    css`
      color: var(--theme-gray-100);
    `}
`;

const Description = styled.p``;

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
  border: 2px solid var(--theme-white);
  cursor: pointer;
  background-color: ${(props) => (props.$isDone ? "green" : "red")};
`;

function Task({ children, id, title, description }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDone, setIsDone] = useState(false);

  function handleCheckout() {
    setIsDone((isDone) => !isDone);
    console.log(isDone);
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
