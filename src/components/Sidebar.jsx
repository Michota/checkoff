import { NavLink, useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Logo from "../ui/Logo";
import {
  MdCalendarMonth,
  MdDelete,
  MdDeleteOutline,
  MdOutlineCalendarMonth,
  MdTask,
  MdTaskAlt,
} from "react-icons/md";

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
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--theme-white-400);
  text-decoration: none;

  &:hover {
    color: var(--theme-white-200);
  }
`;

const StyledSubNavLink = styled(StyledNavLink)`
  font-size: 0.8em;
  margin-top: -1rem;
  /* margin-left: 1rem; */
  color: var(--theme-white-400);
  text-decoration: none;

  &:hover {
    color: var(--theme-white-200);
  }
`;

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <StyledSidebar>
      <Logo />
      <StyledUl>
        <StyledNavLink to="tasks">
          <MdTaskAlt size="2.5rem" /> Tasks
        </StyledNavLink>
        {pathname.includes("/tasks") && (
          <StyledSubNavLink to="tasks/?trash">
            <MdDeleteOutline size="2.5rem" /> Trash
          </StyledSubNavLink>
        )}
        <StyledNavLink to="calendar">
          <MdOutlineCalendarMonth size="2.5rem" /> Calendar
        </StyledNavLink>
      </StyledUl>
    </StyledSidebar>
  );
}

export default Sidebar;
