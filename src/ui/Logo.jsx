import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

function Logo({ size = "250rem" }) {
  return (
    <NavLink to="/">
      <img
        width={size}
        alt="CheckOff Logo"
        src="\src\assets\images\logo.png"
      ></img>
    </NavLink>
  );
}

export default Logo;
