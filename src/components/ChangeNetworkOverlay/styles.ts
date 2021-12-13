import styled from 'styled-components';

export const OverlayContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background-image: linear-gradient(
    223deg,
    #32f05f 0%,
    #425b47 0%,
    #424040 30%,
    #272626 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  border-radius: 0 0 8px 8px;
`;
