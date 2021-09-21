// 실시간 순위 보여질 부분
import styled from 'styled-components';
import BestSearch from './BestSearch';

import { useDispatch } from 'react-redux';
import { setChartModal } from '../actions/index';
import { useEffect } from 'react';

const ChartWrap = styled.div`
  width: 400px; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1399px) {
    width: 100%;
    background-color: blue;
  }
`;

const ChartModalWrap = styled.div`
  flex: 1 1 auto;
  > button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
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
        <button onClick={() => openChartGraphModal(true)}>
          {' '}
          차트 모달 보기
        </button>
      </ChartModalWrap>
      <BestSearch realTime={realTime} />
    </ChartWrap>
  );
}

export default Chart;
