import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

function Logo() {
  return (
    <NavLink to="/">
      <img width="40rem" alt="ChecOff Logo" src="./src/assets/logo.png"></img>
    </NavLink>
  );
}

export default Logo;
