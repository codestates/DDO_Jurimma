// 실시간 순위 보여질 부분
import styled, { keyframes } from 'styled-components';
import BestSearch from './BestSearch';
import '../App.css';
import { useDispatch } from 'react-redux';
import { setChartModal } from '../actions/index';
import { useEffect } from 'react';

const ChartWrap = styled.div`
  width: 400px; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  height: 80vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1399px) {
    width: 80%;
    height: 70vh;
    margin: 0 auto;
  }
`;

const ChartModalWrap = styled.div`
  > button {
    width: 100%;
    border-radius: 20px;
    height: 120px;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    font-family: 'NEXON Lv2 Gothic Bold';
    font-size: 20px;
    color: #fff;
  }
`;

function Chart({ realTime }) {
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_API_URL || `http://localhost:3000`;
  const openChartGraphModal = (isOpen) => {
    dispatch(setChartModal(isOpen));
  }; // 차트 모달 닫는 함수

  return (
    <ChartWrap>
      <ChartModalWrap>
        <button onClick={() => openChartGraphModal(true)}> 실시간 차트</button>
      </ChartModalWrap>
      <BestSearch realTime={realTime} />
    </ChartWrap>
  );
}

export default Chart;
