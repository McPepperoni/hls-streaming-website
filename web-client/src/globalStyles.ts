import { createGlobalStyle } from "styled-components";
import { COLORS } from "./constanst";

const GlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
  monospace;
}

* {
  font-family: 'Roboto Mono', monospace;
  margin: 0;
  padding: 0;

  border: none;
  box-sizing: border-box;
  background-color: transparent;
  color: ${COLORS.DEFAULT.PRIMARY_TEXT};
  font-size: 16px;
  transition: 150ms;
  line-height: 1;
  user-select: none;
}

button {
  cursor: pointer;
}


`;

export default GlobalStyle;
