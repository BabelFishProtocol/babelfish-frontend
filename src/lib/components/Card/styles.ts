import styled from 'styled-components';

//Default Card Styles
export const CardStyled = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-image: linear-gradient(
    223deg,
    #32f05f 0%,
    #425b47 0%,
    #424040 30%,
    #272626 100%
  );
  color: ${(props) => props.theme.color};
`;

//Card Neumorphism
export const CardNeum = styled.div`
  color: white;
  border-radius: 35px;
  background: transparent;
  box-shadow: -3px 3px 10px rgba(0, 0, 0, 0.7),
    3px -3px 10px rgba(255, 255, 255, 0.2);
  transition: 0.3s;
  border: 2px solid rgba(50, 240, 95, 0.4);
  cursor: pointer;
  :hover {
    border: 2px solid rgba(50, 240, 95, 0.7);
  }
`;

//Titled Card Styles
export const TitledHeader = styled.div``;

export const TitledBody = styled.div``;

export const LineBreak = styled.div`
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.4);
`;

//Transaction Card Styles
export const TransactionCardStyled = styled(CardStyled)`
  border-style: solid;
  border-width: 1px;
  border-image-source: linear-gradient(
    44deg,
    #232224 0%,
    #286b39 63%,
    #32f05f 99%
  );
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #2c2b2b, #2c2b2b),
    linear-gradient(44deg, #232224 0%, #286b39 63%, #32f05f 99%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

export const TransactionLoadingText = styled.span`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  text-align: center;
`;

export const TransactionData = styled.div`
  .text-left {
    font-size: 16px;
    font-weight: bold;
  }
  .text-right {
    font-size: 16px;
    font-weight: normal;
  }
`;
