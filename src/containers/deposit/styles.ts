import styled from 'styled-components';

export const ChainsContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputTitle = styled.span`
  display: flex;
  width: 100%;
  height: 30px;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
`;

export const InputSubtext = styled.span`
  opacity: 0.6;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
`;

export const Link = styled.a`
  margin: 0;
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  opacity: 0.8;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    opacity: 1;
    color: ${(props) => props.theme.primary};
  }
`;
