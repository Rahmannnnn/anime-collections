import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { mq } from "../styles/Breakpoints";
import { theme } from "../styles/Theme";

const PaginationContainer = styled.div(
  () => `
    display: flex;
    gap: .5rem;
    justify-content: center;
    margin: 3rem 0;
    
    ${mq("md")} {
      gap: 1rem;
    }

    button {
      outline: none;
      border: 1px solid ${theme.colors.lightGray};
      color: ${theme.colors.lightGray};
      
      border-radius: 50%;
      width: 35px;
      height: 35px;
      font-size: .875rem;

      cursor: pointer;
      background: ${theme.colors.black};

      ${mq("md")} {
        width: 50px;
        height: 50px;
      }
    }
  `
);

const Pagination = (props) => {
  const { currentPage, totalPage, setPage } = props;

  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    let generateNumber = [];

    if (currentPage <= 3) {
      let max = 0;

      if (totalPage > 6) {
        max = 6;
      } else {
        max = totalPage;
      }

      for (let i = 1; i < max + 1; i++) {
        generateNumber.push(i);
      }
    } else {
      let end =
        currentPage +
        (totalPage - currentPage > 1 ? 1 : totalPage - currentPage);
      let start = end - 6 < 1 ? 1 : end - 6 + 1;

      for (let i = start; i < end + 1; i++) {
        generateNumber.push(i);
      }
    }

    setNumbers(generateNumber);
  }, [currentPage, totalPage]);

  return (
    <PaginationContainer>
      {currentPage > 1 ? (
        <button onClick={() => setPage(currentPage - 1)}>{`<`}</button>
      ) : (
        ""
      )}
      {numbers.map((item, index) => (
        <button
          onClick={() => setPage(item)}
          key={"pagination-" + index}
          style={
            item.toString() === currentPage.toString()
              ? {
                  background: theme.colors.green,
                  borderColor: theme.colors.green,
                  color: theme.colors.black,
                }
              : { background: theme.colors.black }
          }
        >
          {item}
        </button>
      ))}

      {currentPage < totalPage ? (
        <button onClick={() => setPage(currentPage + 1)}>{`>`}</button>
      ) : (
        ""
      )}
    </PaginationContainer>
  );
};

export default Pagination;
