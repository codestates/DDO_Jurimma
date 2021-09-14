// Chart 안에 실시간 순위 보여질 부분
import styled from 'styled-components';

const BestSearchWrap = styled.div`
  flex: 5 1 auto; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function BestSearch() {
  return <BestSearchWrap>this is BestSearch</BestSearchWrap>;
}

export default BestSearch;
