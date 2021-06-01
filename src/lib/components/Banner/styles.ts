import styled from 'styled-components';

export const BannerContainer = styled.div`
  height: fit-content;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  padding: 20px 40px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Close = styled.img`
  height: 10px;
  width: 10px;
`;
