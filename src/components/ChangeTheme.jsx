import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import {
  SettingsProvider,
  useSettingsContext,
} from "../contexts/SettingsContext";
import Button from "../ui/Button";

function ChangeTheme({ size }) {
  const { theme, setTheme } = useSettingsContext();
  return (
    <Button
      onClick={(e) => {
        console.log(e);
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme === "dark" ? (
        <MdOutlineDarkMode size={size ? size : "1em"} />
      ) : (
        <MdOutlineLightMode size={size ? size : "1em"} />
      )}
    </Button>
  );
}

export default ChangeTheme;
