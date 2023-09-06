import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import Logo from "../ui/Logo";

const StyledSidebar = styled.div`
  box-shadow: 0.5rem 0 2rem 0 var(--shadow-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-size: 2.4rem;
  gap: 2rem;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--theme-white-400);
  text-decoration: none;

  &:hover {
    color: var(--theme-white-200);
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <StyledUl>
        <li>
          <StyledNavLink to="tasks">Tasks</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="calendar">Calendar</StyledNavLink>
        </li>
      </StyledUl>
    </StyledSidebar>
  );
}

export default Sidebar;
