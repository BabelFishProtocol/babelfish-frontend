import styled from "styled-components";

export const TableStyles = styled.div`
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #ffffff;
    thead {
      tr {
        th {
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          color: #ffffff;
        }
        &:first-child {
          font-family: "ArbelBold";
          font-weight: bold;
        }
      }
    }
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.75rem 1.25rem;
      border: none;
      border-bottom: solid 1px rgba(255, 255, 255, 0.1);

      :last-child {
        border-right: 0;
      }
    }
  }
`;
