import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  html {
    line-height: 1.6;
    position: relative;
    min-height: 100%;
  }
  
  body {
    font-family: "IBM Plex Sans", sans-serif;
    color: ${({ theme }) => theme.colors.text};
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
  }
  
  button {
    cursor: pointer;
  }
  
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.alt};
    &:hover {
      color: ${({ theme }) => theme.colors.altHover};
    }
  }
`;

export default GlobalStyle;