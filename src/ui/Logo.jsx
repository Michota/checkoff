import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

function Logo({ size = "100%" }) {
  return (
    <NavLink to="/">
      <img width={size} alt="ChecOff Logo" src="\src\assets\logo.png"></img>
    </NavLink>
  );
}

export default Logo;
