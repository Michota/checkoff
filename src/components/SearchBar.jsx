import { useEffect } from "react";
import { useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

const StyledSearchBar = styled.input`
  background-color: var(--theme-black-300);
  color: var(--theme-white-400);
  opacity: 0.8;

  font-size: 1.6rem;
  /* font-weight: bold; */
  padding: 1rem 2rem;
  min-width: 15rem;
  width: 100%;
  border-radius: var(--default-radius);
  cursor: pointer;
  text-align: center;

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
    color: var(--theme-white-400);
    transition: 250ms all;
    scale: 80%;
    text-align: center;
  }

  &:hover::placeholder,
  &:active::placeholder,
  &:focus::placeholder {
    scale: 100%;
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
  searchParameters = [""],
  whereToSearch = [],
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Function created to avoid problems caused by useState being asynchronous
  function setParams(newParams) {
    const params = searchParameters.map((sP) => {
      return [sP, newParams];
    });
    navigate(
      {
        search: `?${createSearchParams(params)}`,
      },
      {
        // ! if state === "trash" then search in removed tasks.
        state: location.state,
      }
    );
  }

  // ? To be removed in the future
  // if (mode === "filter") {
  //   const searchResults = whereToSearch?.filter((element) =>
  //     element[searchParameters].includes(searchQuery)
  //   );
  // }

  return (
    <StyledSearchBar
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setParams(e.target.value);
      }}
    />
  );
}

export default SearchBar;
