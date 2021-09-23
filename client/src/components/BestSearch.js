// Chart 안에 실시간 순위 보여질 부분
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

const BestSearchWrap = styled.div`
  /* flex: 5 1 auto; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기 */
  height: 40vh;
  box-sizing: border-box;
  background-color: pink;
  /* margin-top: 20px; */
  border: 1px solid red;
  > .bestSearchTitle {
  }
  > .bestSearchList {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
`;
const flip = keyframes`
  0% {
    width:0%;
  }
  100% {
    width:100%;
  }
`;
const BestSearchList = styled.ul`
  width: 49.5%;
  display: flex;
  flex-direction: column;
  height: 100%;
  > li {
    flex: 1 1 auto;
    color: #fff;
    /* display: grid;
    place-items: center; */
    background-color: transparent;
    transition: all 1s;
    margin-top: 5px;
    cursor: pointer;
    position: relative;
    > span {
      display: block;
      width: 100%;
      height: 2px;
      position: absolute;
      top: 100%;
    }
    > span:before,
    span:after {
      content: '';
      width: 2px;
      height: 0px;
      transition: all 0.4s linear;
      position: absolute;
      top: 0;
      background: #fff;
    }

    > span.highlight:before,
    span.highlight:after {
      width: 100%;
      height: 2px;
    }
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
      <div className='bestSearchTitle'>실시간 검색어 Top 10</div>
      <div className='bestSearchList'>
        <BestSearchList>
          {bestSearchState.searchData.slice(0, 5).map((el, idx) => {
            return (
              <li key={el.id} onClick={() => setWord(el.wordName)}>
                {el.wordName}
                <span className={idx === listNum ? 'highlight' : ''}></span>
              </li>
            );
          })}
        </BestSearchList>
        <BestSearchList>
          {bestSearchState.searchData.slice(5).map((el, idx) => {
            return (
              <li key={el.id} onClick={() => setWord(el.wordName)}>
                {el.wordName}
                <span className={idx + 5 === listNum ? 'highlight' : ''}></span>
              </li>
            );
          })}
        </BestSearchList>
      </div>
    </BestSearchWrap>
  );
}

export default BestSearch;
