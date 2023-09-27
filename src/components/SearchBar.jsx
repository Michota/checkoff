import { useEffect } from "react";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
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
  // * if mode is "filter" then search trough provided array
  // * if mode is set to "url" then use URL as return point for search parameters
  mode = "filter",
  searchParameter = "",
  whereToSearch = [],
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(
    function () {
      if (mode !== "filter")
        navigate({
          search: `?${createSearchParams({ [searchParameter]: searchQuery })}`,
        });
    },
    [navigate, searchParameter, searchQuery, mode]
  );

  if (mode === "filter") {
    const searchResults = whereToSearch?.filter((element) =>
      element[searchParameter].includes(searchQuery)
    );
    console.log(searchResults);
  }

  return (
    <StyledSearchBar
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
    />
  );
}

export default SearchBar;
