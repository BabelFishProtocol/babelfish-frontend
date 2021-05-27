import styled from "styled-components";

export const TableStyles = styled.div`
  padding: 1rem;
  width: 100%;
  .table > :not(:last-child) > :last-child > * {
    border-bottom-color: none;
  }
  table {
    .warning {
      background-color: #ffd859;
      td {
        border-color: #ffd859;
      }
    }
    .danger {
      background-color: #ff7d7d;
      td {
        border-color: #ff7d7d;
      }
    }
    border-spacing: 0;
    thead {
      tr {
        :first-child {
          display: none;
        }
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      input {
        border: none;
        height: 100%;
        width: 100%;
      }
      :last-child {
        border-right: 0;
      }
    }
  }
`;
