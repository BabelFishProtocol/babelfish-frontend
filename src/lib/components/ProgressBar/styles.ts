import styled from 'styled-components';

export const Bar = styled.div<{percentage: number}>`
  height: 5px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  background-color: white;
  :after {
    content: '';
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => props.percentage}%;
    background-color: ${(props) => props.theme.primary};
  }
`;
