// main 페이지 (검색 및 검색결과 보기 페이지)
import styled from 'styled-components';
import Search from '../components/Search';
import Chart from '../components/Chart';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ChartModal from '../modals/ChartModal';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchList, setLogout } from '../actions/index';
import swal from 'sweetalert';
axios.defaults.withCredentials = true;

const MainWrap = styled.div`
  width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 120px;
  flex-wrap: wrap;
  @media only screen and (max-width: 1399px) {
    width: 80vw;
  }
  @media only screen and (max-width: 800px) {
    margin-top: 120px;
  }
`;

function Main() {
  const state = useSelector((state) => state.userModalReducer);
  const dispatch = useDispatch();
  let url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const [word, setWord] = useState(''); // 입력창
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
        dispatch(setSearchList(res.data.data));
      })
      .catch((err) => console.log(err));
  }, 60000);

  useEffect(() => {
    let url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
    axios
      .get(`${url}/word/chart`)
      .then((res) => {
        dispatch(setSearchList(res.data.data));
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: 'Internal Server Error',
          text: '죄송합니다. 다시 로그인 후 해주세요.',
          icon: 'warning',
        });
        dispatch(setLogout());
        window.location.replace('/');
      });
  }, [dispatch]);

  return (
    <>
      {state.isShowChartModal ? <ChartModal /> : null}
      <MainWrap>
        <Search word={word} setWord={setWord} />
        <Chart setWord={setWord} />
      </MainWrap>
    </>
  );
}

export default Main;
