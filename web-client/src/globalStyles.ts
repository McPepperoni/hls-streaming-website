import { createGlobalStyle } from "styled-components";
import { COLORS } from "./constanst";

const GlobalStyle = createGlobalStyle`
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${COLORS.DEFAULT.PRIMARY_BG};
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
  /* color: ${COLORS.DEFAULT.PRIMARY_TEXT}; */
  font-size: 16px;
  transition: 150ms;
  line-height: 1;
  user-select: none;
}

button {
  cursor: pointer;
}

svg {
  color: inherit;
}


`;

export default GlobalStyle;
