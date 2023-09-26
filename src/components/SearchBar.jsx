import { useState } from "react";
import styled from "styled-components";

const StyledSearchBar = styled.input`
  background-color: var(--theme-black-300);
  color: var(--theme-white-100);
  padding: 1rem 2rem;
  min-width: 15rem;
  width: 100%;
  border-radius: var(--default-radius);
  cursor: pointer;

  transition: 200ms background-color;

  &:hover {
    background-color: var(--theme-black-250);
  }

  &:active,
  &:focus {
    cursor: initial;
    background-color: var(--theme-black-200);
    border-bottom: 0.1rem var(--theme-white-100) solid;
    margin-bottom: -0.1rem;
  }

  &::placeholder {
    color: var(--theme-white-100);
    opacity: 25%;
    transition: 250ms all;
    scale: 80%;
    text-align: center;
  }

  &:hover::placeholder,
  &:active::placeholder,
  &:focus::placeholder {
    scale: 100%;
    text-align: left;
  }
`;

// ? type: "search" makes user-agents style searchbar, so it's disabled.
// StyledSearchBar.defaultProps = {
//   type: "search",
// };

function SearchBar({
  placeholder = "Search",
  searchParameter = "",
  whereToSearch = [],
  setResultsFn,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  if (search)
  const searchResults = whereToSearch?.filter((element) =>
    element[searchParameter].includes(searchQuery)
  );

  console.log(searchResults);
  console.log(searchParameter);
  console.log(whereToSearch);

  return (
    <StyledSearchBar
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

export default SearchBar;
