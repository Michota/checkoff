import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {

  & {


  --theme-primary: #ffbd2d;
  --theme-primary-rgba: 255,189,45;
  --theme-secondary: #ffd270;

  --theme-white-100: #ececec;
  --theme-white-200: #E0E0E0;
  --theme-white-300: #CCCCCC;
  --theme-white-400: #B8B8B8;
  
  --theme-black-000: #141414;
  --theme-black-100: #1F1F1F;
  --theme-black-200: #222222;
  --theme-black-250: #303030;
  --theme-black-300: #3D3D3D;
  --theme-black-400: #666666;


  --theme-darkred-200: #420000;
  --theme-darkred-250: #610000;


  --priority-0: #ececec;
  --priority-1: #FFEA00;
  --priority-2: #FF9D00;
  --priority-3: #FF2F00;


  --theme-red: #ff7d7d;
  --theme-green: #8aff95;

  --default-radius: 6px;
  --drop-shadow: 0px 2px 10px 0px var(--shadow-color);
  --shadow-color: rgba(0,0,0, 0.3);

  }

  &.light-theme {
  --theme-primary: #ffbd2d;
  --theme-primary-rgba: 255,189,45;
  --theme-secondary: #ffd270;

  --theme-white-100: #141414;
  --theme-white-200: #1F1F1F;
  --theme-white-300: #222222;
  --theme-white-400: #3D3D3D;
  
  --theme-black-000: #f2f2f2;
  --theme-black-100: #dedede;
  --theme-black-200: #d1d1d1;
  --theme-black-250: #c2c2c2;
  --theme-black-300: #b3b3b3;
  --theme-black-400: #999999;

    
  /* --theme-black-000: #141414;
  --theme-black-100: #ececec;
  --theme-black-200: #cfcfcf;
  --theme-black-250: #cccccc;
  --theme-black-300: #a3a3a3;
  --theme-black-400: #7d7d7d; */


  --theme-darkred-200: #a80000;
  --theme-darkred-250: #8a0000;


  --priority-0: var(--theme-black-000);
  --priority-1: #FFEA00;
  --priority-2: #FF9D00;
  --priority-3: #FF2F00;


  --theme-red: #ff7d7d;
  --theme-green: #8aff95;

  --default-radius: 6px;
  --drop-shadow: 0px 2px 10px 0px var(--shadow-color);
  --shadow-color: rgba(0,0,0, 0.3);


  ::selection {
    color: black;
  }

}


}



*, *::after, *::before{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}

*::selection{
  background-color: var(--theme-primary);
  color: var(--theme-black-000);
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

p {
  color: var(--theme-white-200);
}

::-webkit-scrollbar {
  width: 1.6rem;
  height: 1rem;
}


::-webkit-scrollbar-track {
  background-color: var(--theme-black-200);
  margin-block: 2rem;
  border-radius: 1rem;

}


::-webkit-scrollbar-thumb {
  background-color: var(--theme-black-250);
  border-radius: 1rem;
  border: 0.2em var(--theme-black-200) solid;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--theme-black-300);
}


@supports (scrollbar-color: var(--theme-black-200) var(--theme-black-250)) {
  * {
    scrollbar-color: var(--theme-black-250)  var(--theme-black-200);
    scrollbar-width: auto;
  }
}

`;

export default GlobalStyles;
