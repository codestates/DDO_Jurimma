// Chart 안에 실시간 순위 보여질 부분
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

const BestSearchWrap = styled.div`
  flex: 5 1 auto; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  box-sizing: border-box;
  margin-top: 20px;
`;
const flip = keyframes`
  0% {
    tramsform: rotateX(0deg);
  }
  50% {
    transform: rotateX(180deg);
  }
  100% {
    tramsform: rotateX(360deg);
  }
`;
const BestSearchList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  > li {
    flex: 1 1 auto;
    border: 2px solid #fff;
    color: #fff;
    display: grid;
    place-items: center;
    background-color: transparent;
    transition: all 1s;
    border-radius: 20px;
    margin-top: 5px;
    cursor: pointer;
  }
  > li.highlight {
    background-color: #b4aee8;
    animation: ${flip} 3s ease infinite;
  }
`;

function BestSearch({ setWord }) {
  const [listNum, setListNum] = useState(0);
  const bestSearchState = useSelector((state) => state.bestSearchReducer);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  useInterval(() => {
    if (listNum >= bestSearchState.searchData.length - 1) {
      setListNum(0);
    } else {
      setListNum(listNum + 1);
    }
  }, 3000);

  return (
    <BestSearchWrap>
      <BestSearchList>
        {bestSearchState.searchData.map((el, idx) => {
          return (
            <li
              key={el.id}
              className={idx === listNum ? 'highlight' : ''}
              onClick={() => setWord(el.wordName)}
            >
              {el.wordName}
            </li>
          );
        })}
      </BestSearchList>
    </BestSearchWrap>
  );
}

export default BestSearch;
