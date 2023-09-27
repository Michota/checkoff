import { NavLink, useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Logo from "../ui/Logo";
import {
  MdDeleteOutline,
  MdLogout,
  MdOutlineCalendarMonth,
  MdTaskAlt,
} from "react-icons/md";
import { useState } from "react";
import { useLogout } from "../features/authentication/useLogout";

const StyledSidebar = styled.div`
  position: absolute;
  background-color: var(--theme-black-100);
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-size: 2.4rem;
  gap: 2rem;
  width: ${(props) => (!props.$rolled ? "20rem" : "7rem")};
  transition: box-shadow 50ms, width 200ms ease-out;

  &:hover {
    box-shadow: 0.5rem 0 2rem 0 var(--shadow-color);
  }
`;

// ? created for calendars width purposes
const SidebarPlaceholder = styled.div`
  width: 8rem;
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
  const [isRolled, setIsRolled] = useState(true);
  const { logout, isLoading: isLoggingOut } = useLogout();

  if (pathname)
    return (
      <SidebarPlaceholder>
        <StyledSidebar
          $rolled={isRolled}
          onMouseLeave={(e) => setIsRolled(true)}
          onMouseEnter={(e) => setIsRolled(false)}
        >
          <Logo size="40rem" />
          <StyledUl>
            <StyledNavLink to="tasks">
              <MdTaskAlt size="2.5rem" />
              {!isRolled && "Tasks"}
            </StyledNavLink>
            {pathname.includes("/tasks") && (
              <StyledSubNavLink to="tasks" state={"trash"}>
                <MdDeleteOutline size="2.5rem" /> {!isRolled && "Trash"}
              </StyledSubNavLink>
            )}
            <StyledNavLink to="calendar">
              <MdOutlineCalendarMonth size="2.5rem" />
              {!isRolled && "Calendar"}
            </StyledNavLink>
            <StyledNavLink onClick={logout}>
              <MdLogout size="2.5rem" /> {!isRolled && "Logout"}
            </StyledNavLink>
          </StyledUl>
        </StyledSidebar>
      </SidebarPlaceholder>
    );
}

export default Sidebar;
