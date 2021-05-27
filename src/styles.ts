import styled from "styled-components";

export const Body = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.background};
  font-family: ArbelRegular;
  font-smooth: auto;
  font-smooth: never;
  font-smooth: always;
  font-smooth: 2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
