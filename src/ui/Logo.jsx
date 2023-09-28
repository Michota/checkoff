import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

function Logo({ size = "250rem", full = true }) {
  const source = full
    ? `/src/assets/images/logo.png`
    : `/src/assets/images/check.png`;
  return (
    <NavLink to="/">
      <img width={size} alt="CheckOff Logo" src={source}></img>
    </NavLink>
  );
}

export default Logo;
