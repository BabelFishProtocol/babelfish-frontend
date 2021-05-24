import styled from "styled-components";

export const CardStyled = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: ${(props) => props.theme.background};
`;
