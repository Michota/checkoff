import { NavLink } from "react-router-dom";
import fullLogo from "/src/assets/images/Logo.png";
import checkmark from "/src/assets/images/Check.png";

function Logo({ size = "250rem", full = true }) {
  const source = full ? fullLogo : checkmark;
  return (
    <NavLink to="/">
      <img width={size} alt="CheckOff Logo" src={source}></img>
    </NavLink>
  );
}

export default Logo;
