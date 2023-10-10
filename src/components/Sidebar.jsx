import { useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useLogout } from "../features/authentication/useLogout";
import { css, styled } from "styled-components";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import {
  MdDeleteOutline,
  MdLogout,
  MdOutlineCalendarMonth,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineSettings,
  MdPersonOutline,
  MdTaskAlt,
} from "react-icons/md";
import {
  SettingsProvider,
  useSettingsContext,
} from "../contexts/SettingsContext";
import ChangeTheme from "./ChangeTheme";

const StyledSidebar = styled.div`
  position: absolute;
  background-color: var(--theme-black-100);
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  font-size: 2.4rem;
  gap: 2rem;
  width: ${(props) => (!props.$rolled ? "18rem" : "6rem")};
  transition: box-shadow 50ms, width 200ms ease-out;

  &:hover {
    box-shadow: 0.5rem 0 2rem 0 var(--shadow-color);
  }
`;

// ? created for calendars width purposes
const SidebarPlaceholder = styled.div`
  width: 7rem;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  width: 100%;
  padding: 1rem;

  &:last-child {
    margin-top: auto;
  }
  &:last-child:hover {
    color: var(--theme-red);
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  color: var(--theme-white-400);
  text-decoration: none;
  font-size: 2.4rem;
  height: 3rem;
  padding: 0.8rem;
  transition: color 100ms;

  border-radius: 2rem;

  ${(props) =>
    props.$isRolled === false
      ? css`
          justify-content: left;
        `
      : ""}

  &:hover {
    color: var(--theme-white-200);
  }

  &.active {
    background-color: var(--theme-black-300);
  }
  &.active.trash,
  &.active.theme {
    background-color: transparent !important;
  }
`;

const LogoutLink = styled.span`
  & > * {
    margin-top: auto;
    transition: color 100ms;
  }

  & > *:hover {
    color: var(--theme-red);
  }
`;

const LogoContainer = styled.div`
  height: 4em;
  .light-theme & {
    filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.5));
  }
`;

// ==== end of styling ====

NavLink.defaultProps = {
  className: ({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : "",
};

function Sidebar() {
  const location = useLocation();
  const [isRolled, setIsRolled] = useState(true);
  const { logout, isLoading: isLoggingOut } = useLogout();
  const { theme, setTheme } = useSettingsContext();

  if (location.pathname)
    return (
      <SidebarPlaceholder>
        <StyledSidebar
          $rolled={isRolled}
          onMouseLeave={(e) => {
            setIsRolled(true);
          }}
          onMouseEnter={(e) => {
            setIsRolled(false);
          }}
        >
          <LogoContainer>
            {!isRolled ? (
              <Logo size={"125rem"} full={true} />
            ) : (
              <Logo size={"25rem"} full={false} />
            )}
          </LogoContainer>
          <StyledUl>
            <StyledNavLink $isRolled={isRolled} to="/tasks">
              <MdTaskAlt size="0.8em" />
              {!isRolled && <span>Tasks</span>}
            </StyledNavLink>
            {location.pathname.includes("/tasks") && (
              <StyledNavLink
                to="/tasks"
                className="trash"
                $isRolled={isRolled}
                state={{ ...location.state, trash: true }}
              >
                <MdDeleteOutline size="0.8em" />
                {!isRolled && <span>Trash</span>}
              </StyledNavLink>
            )}
            <StyledNavLink $isRolled={isRolled} to="/calendar">
              <MdOutlineCalendarMonth size="0.8em" />
              {!isRolled && <span>Calendar</span>}
            </StyledNavLink>
          </StyledUl>

          <StyledUl>
            <StyledNavLink $isRolled={isRolled} to="/profile">
              <MdPersonOutline size="0.8em" />
              {!isRolled && <span>Profile</span>}
            </StyledNavLink>
            <StyledNavLink $isRolled={isRolled} to="/settings">
              <MdOutlineSettings size="0.8em" />
              {!isRolled && <span>Settings</span>}
            </StyledNavLink>
          </StyledUl>
          <StyledUl>
            <ChangeTheme size="0.8em" />{" "}
          </StyledUl>

          <LogoutLink>
            <StyledNavLink to="logout" size="0.8em" onClick={logout}>
              <MdLogout size="0.8em" />
              {!isRolled && <span>Logout</span>}
            </StyledNavLink>
          </LogoutLink>
        </StyledSidebar>
      </SidebarPlaceholder>
    );
}

export default Sidebar;
