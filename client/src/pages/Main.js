// main 페이지 (검색 및 검색결과 보기 페이지)
import styled from 'styled-components';

import Search from '../components/Search';
import Chart from '../components/Chart';

const MainWrap = styled.div`
  height: 70vh; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
`; // 현재 3:1비율로 한꺼번에 보이는데, 크기가 작아질 경우 상단에 검색창 + 하단에 검색어 차트가 보이게 수정 필요

function Main() {
  return (
    <MainWrap>
      <Search />
      <Chart />
    </MainWrap>
  );
}

export default Main;
