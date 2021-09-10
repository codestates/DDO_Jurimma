// 실시간 순위 보여질 부분
import styled from 'styled-components';

const ChartWrap = styled.div`
  flex: 1 1 auto; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function Chart() {
  return <ChartWrap>this is Chart</ChartWrap>;
}

export default Chart;
