import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --theme-primary: #ffbd2d;
  --theme-secondary: #ffd270;
  --theme-white: #ececec;

  --theme-black-000: #000000;
  --theme-black-100: #111111;
  --theme-black-200: #222222;
  --theme-black-300: #333333;

  --theme-gray-100: #4a4a4a;

  
  --theme-red: #ff7d7d;
  --theme-green: #8aff95;

  --deafult-radius: 2px;
}

*, *::after, *::before{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
}

`;

export default GlobalStyles;
