import styled from "styled-components";
import LabeledInput from "../components/ui/LabeledInput";
import { useSettingsContext } from "../contexts/SettingsContext";
import ImageInBackground from "../components/ui/ImageInBackground";
import personalsettings from "../assets/images/unDraw/personal_settings.svg";

const StyledSettings = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;

  hr {
    margin-top: 2rem;
    margin-bottom: 2rem;
    border: 1px solid var(--theme-white-100);
    opacity: 0.1;
  }
  font-size: 1.2em;

  section {
    margin: 2rem 0 2rem 0;

    small {
      color: var(--theme-white-300);
      display: block;
      margin-top: 1rem;
      margin-bottom: 2rem;
    }
  }
`;

const Options = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  font-size: 2.4rem;
  gap: 2rem;

  input {
    font-size: 1.2rem;
    cursor: pointer;
  }

  div {
    display: flex;
    flex-direction: row-reverse;
    width: max-content;
    gap: 3rem;
    justify-content: center;
    align-items: center;
  }
`;

function Settings() {
  const { theme, setTheme } = useSettingsContext();

  return (
    <StyledSettings>
      <h1>Settings</h1>
      <hr />
      <section>
        <header>
          <h2>Appearance</h2>
          <small>Dark mode or light mode?</small>
          <div>
            <h4>Theme</h4>
            <Options>
              <div>
                <LabeledInput
                  id="theme-dark"
                  type="radio"
                  name="appearance-theme"
                  value="dark"
                  checked={"dark" === theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  Dark Theme
                </LabeledInput>
              </div>
              <div>
                <LabeledInput
                  id="theme-light"
                  type="radio"
                  name="appearance-theme"
                  value="light"
                  checked={"light" === theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  Light Theme
                </LabeledInput>
              </div>
            </Options>
          </div>
        </header>
      </section>
      <ImageInBackground
        isFixed={true}
        imgURL={personalsettings}
      ></ImageInBackground>
    </StyledSettings>
  );
}

export default Settings;
