import styled from 'styled-components';

export const SelectChainContainer = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  width: 200px;
  height: 200px;
  border-radius: 8px;
  border: solid 2px rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: 0.3s;
  :hover {
    border: solid 2px ${(props) => props.theme.primary};
    background-color: rgba(50, 240, 95, 0.1);
  }
`;

export const ChainIconContainer = styled.div`
  width: 80px;
  height: 100px;
`;

export const ChainIcon = styled.img`
  object-fit: none;
  padding: 10px 0;
  flex: 3;
`;

export const ChainName = styled.span`
  display: flex;
  align-items: flex-end;
  flex: 1;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`;

export const ChainGroupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
