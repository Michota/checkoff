import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --theme-primary: #ffbd2d;
  --theme-secondary: #ffd270;

  --theme-white-100: #ececec;
  --theme-white-200: #E0E0E0;
  --theme-white-300: #CCCCCC;
  --theme-white-400: #B8B8B8;
  
  --theme-black-000: #1F1F1F;
  --theme-black-100: #141414;
  --theme-black-200: #222222;
  --theme-black-250: #303030;
  --theme-black-300: #3D3D3D;
  --theme-black-400: #666666;

  --priority-0: #ececec;
  --priority-1: #FFEA00;
  --priority-2: #FF9D00;
  --priority-3: #FF2F00;


  --theme-red: #ff7d7d;
  --theme-green: #8aff95;

  --deafult-radius: 6px;
  --drop-shadow: 0px 2px 10px 0px var(--shadow-color);
  --shadow-color: rgba(0,0,0, 0.3)
}

*, *::after, *::before{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}

input{
  background-color: inherit;
  color: inherit;
  border: inherit;
}

*:focus {
  outline: none;
}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
}

`;

export default GlobalStyles;
