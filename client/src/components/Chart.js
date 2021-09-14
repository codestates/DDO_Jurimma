// 실시간 순위 보여질 부분
import styled from 'styled-components';
import BestSearch from './BestSearch';

import { useDispatch } from 'react-redux';
import { setChartModal } from '../actions/index';

const ChartWrap = styled.div`
  width: 500px; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  height: 100vh;
  border: 1px solid red;
  box-sizing: border-box;
  background-color: yellow;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1680px) {
    background-color: #ddd;
    width: 80%;
    margin: 0 auto;
  }
`;

const ChartModalWrap = styled.div`
  flex: 1 1 auto;
`;

function Chart() {
  const dispatch = useDispatch();
  const openChartGraphModal = (isOpen) => {
    dispatch(setChartModal(isOpen));
  }; // 로그인 모달 닫는 함수

  return (
    <ChartWrap>
      <ChartModalWrap>
        <button onClick={() => openChartGraphModal(true)}>
          {' '}
          차트 모달 보기
        </button>
      </ChartModalWrap>
      <BestSearch />
    </ChartWrap>
  );
}

export default Chart;
