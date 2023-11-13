import styled from "styled-components";
import Button from "./ui/Button";
import { useLocation, useNavigate } from "react-router";
import useLocationState from "../features/URL/useLocationState";
import { useEffect, useState } from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

const StyledSortingButtons = styled.div`
  ::selection {
    background-color: transparent;
    color: inherit;
  }
  ::-moz-selection {
    background-color: transparent;
    color: inherit;
  }
  cursor: default;
  display: flex;
  width: 100%;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 1rem;
    color: var(--theme-white-400);
  }
`;

const StyledOptions = styled.div`
  font-size: 0.7em;
  display: grid;
  grid-template-columns: 5rem max-content 1fr;
  align-items: center;
`;

const IconContainer = styled.span`
  width: 3rem;
`;

const SortButton = styled(Button)`
  background-color: var(--theme-black-300);
  color: var(--theme-white-400);

  padding: 0.5rem 1rem;
  &.active {
    color: var(--theme-white-200);
    border-bottom: 0.1rem var(--theme-white-100) solid;
    margin-bottom: -0.1rem;
  }
`;

function SortingOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addURLState } = useLocationState(location.state);
  const selectedOption = location?.state?.sortingOption;

  const [orderIndicator, setOrderIndicator] = useState();

  // Read data from selectedOption after page refreshes
  useEffect(
    function () {
      if (selectedOption?.option)
        setOrderIndicator(selectedOption.ascending ? 1 : 2);
      else setOrderIndicator(0);
    },
    [selectedOption]
  );

  function handleSortingOption(option) {
    let newState;
    // 1. Option selected, ascending order
    if (selectedOption?.option !== option) {
      newState = { option, ascending: true };
      setOrderIndicator(1);
    }
    // 2. Option selected, descending order
    if (
      selectedOption?.option === option &&
      selectedOption?.ascending === true
    ) {
      newState = { option, ascending: false };
      setOrderIndicator(2);
    }
    // 3. null, null
    if (
      selectedOption?.option === option &&
      selectedOption?.ascending === false
    ) {
      newState = { option: "", ascending: false };
      setOrderIndicator(0);
    }

    // Preserve pathname and search parameters, modify state.
    navigate(`${location.pathname}${location.search}`, {
      state: addURLState("sortingOption", {
        ...newState,
      }),
    });
  }

  // ! Bad code... but it works! Needs to be refactored.
  let icon;

  if (orderIndicator === 0) icon = "";
  if (orderIndicator === 1) icon = <MdArrowUpward />;
  if (orderIndicator === 2) icon = <MdArrowDownward />;

  return (
    <StyledOptions>
      <p>Order By</p>
      <IconContainer>{icon}</IconContainer>
      <StyledSortingButtons>
        <SortButton
          className={selectedOption?.option === "priority" ? "active" : null}
          onClick={() => handleSortingOption("priority")}
        >
          Priority
        </SortButton>
        <SortButton
          className={selectedOption?.option === "startDate" ? "active" : null}
          onClick={() => handleSortingOption("startDate")}
        >
          Date
        </SortButton>
        <SortButton
          className={selectedOption?.option === "title" ? "active" : null}
          onClick={() => handleSortingOption("title")}
        >
          Name
        </SortButton>
      </StyledSortingButtons>
    </StyledOptions>
  );
}

export default SortingOptions;
