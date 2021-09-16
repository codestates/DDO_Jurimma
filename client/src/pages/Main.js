// main 페이지 (검색 및 검색결과 보기 페이지)
import styled from 'styled-components';
import Search from '../components/Search';
import Chart from '../components/Chart';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const MainWrap = styled.div`
  width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 200px;
  flex-wrap: wrap;
  @media only screen and (max-width: 1399px) {
    width: 80vw;
  }
`; // 현재 3:1비율로 한꺼번에 보이는데, 크기가 작아질 경우 상단에 검색창 + 하단에 검색어 차트가 보이게 수정 필요

function Main() {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const [realTime, setRealTime] = useState([]);
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
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
    axios
      .get(`${url}/word/chart`)
      .then((res) => {
        setRealTime(res.data.data);
      })
      .catch((err) => console.log(err));
  }, 60000);

  useEffect(() => {
    axios
      .get(`${url}/word/chart`)
      .then((res) => {
        setRealTime(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MainWrap>
      <Search />
      <Chart realTime={realTime} />
    </MainWrap>
  );
}

export default Main;
