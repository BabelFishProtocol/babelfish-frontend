import styled from 'styled-components';

export const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-100px);
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  max-width: 500px;
  min-width: 400px;
  min-height: 200px;
  background-color: #3f3f3f;
  border-radius: 10px;
  position: relative;
  color: white;
`;

export const Close = styled.div`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 12px;
`;
