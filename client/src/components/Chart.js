// 실시간 순위 보여질 부분
import styled from 'styled-components';
import BestSearch from './BestSearch';

import { useDispatch } from 'react-redux';
import { setChartModal } from '../actions/index';

const ChartWrap = styled.div`
  flex: 1 1 auto; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

function Chart() {
  const dispatch = useDispatch();
  const openChartGraphModal = (isOpen) => {
    dispatch(setChartModal(isOpen));
  }; // 로그인 모달 닫는 함수

  return (
    <ChartWrap>
      <button onClick={() => openChartGraphModal(true)}> 차트 모달 보기</button>
      <BestSearch />
    </ChartWrap>
  );
}

export default Chart;
