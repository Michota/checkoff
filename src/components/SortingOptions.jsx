import styled from "styled-components";
import Button from "../ui/Button";
import { useLocation, useNavigate } from "react-router";
import useLocationState from "../features/URL/useLocationState";

const StyledSortingOptions = styled.div`
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

const SortButton = styled(Button)`
  background-color: var(--theme-black-300);
  color: var(--theme-white-400);

  padding: 0.5rem 1rem;
  &.active {
    color: var(--theme-white-200);
    font-weight: bold;
    border-bottom: 0.1rem var(--theme-white-100) solid;
    margin-bottom: -0.1rem;
  }
`;

function SortingOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addURLState } = useLocationState(location.state);
  const selectedOption = location?.state?.sortingOption;

  function handleSortingOption(option) {
    let newState;
    // 1. option, asc
    if (selectedOption?.option !== option)
      newState = { option, ascending: true };
    // 2. option, desc
    if (selectedOption?.option === option && selectedOption?.ascending === true)
      newState = { option, ascending: false };
    // 3. null, null
    if (
      selectedOption?.option === option &&
      selectedOption?.ascending === false
    )
      newState = { option: "", ascending: false };

    navigate(`${location.pathname}${location.search}`, {
      state: addURLState("sortingOption", {
        ...newState,
      }),
    });
  }

  return (
    <StyledSortingOptions>
      <p>Order by</p>
      <SortButton
        className={selectedOption?.option === "priority" ? "active" : null}
        onClick={() => handleSortingOption("priority")}
      >
        Priority
      </SortButton>
      <SortButton
        className={selectedOption?.option === "date" ? "active" : null}
        onClick={() => handleSortingOption("date")}
      >
        Date
      </SortButton>
      <SortButton
        className={selectedOption?.option === "name" ? "active" : null}
        onClick={() => handleSortingOption("name")}
      >
        Name
      </SortButton>
      <SortButton
        className={selectedOption?.option === "created" ? "active" : null}
        onClick={() => handleSortingOption("created")}
      >
        Created
      </SortButton>
    </StyledSortingOptions>
  );
}

export default SortingOptions;
