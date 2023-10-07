import { NavLink } from "react-router-dom";
import fullLogo from "../assets/images/logo.png";
import checkmark from "../assets/images/check.png";

function Logo({ size = "250rem", full = true }) {
  const source = full ? fullLogo : checkmark;
  return (
    <NavLink to="/">
      <img width={size} alt="CheckOff Logo" src={source}></img>
    </NavLink>
  );
}

export default Logo;
