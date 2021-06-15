import styled from 'styled-components';

export const BarContainer = styled.div`
  display: flex;
  width: 100%;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
`;

export const Bar = styled.div`
  width: 100%;
  height: 12px;
  background-color: #dc0e41;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 12px;
    background-color: #32f05f;
  }
`;
