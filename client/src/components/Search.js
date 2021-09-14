// 메인페이지에서 입력창, 입력창 자동완성, 과거 검색기록, 검색결과 보여질 부분
import styled from 'styled-components';
import SearchAutoComp from './SearchAutoComp';
import SearchHistory from './SearchHistory';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

const SearchWrap = styled.div`
  width: 1000px;
  height: 100vh;
  background-color: pink;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1680px) {
    background-color: green;
    width: 80%;
    margin: 0 auto;
  }
`;

function Search() {
  // 검색 결과값을 빈 useState으로 갖고있음
  // Input에 입력하고 엔터키 / 버튼 클릭하게 되면 axios 요청이 가게 되고 검색결과값 state가 업데이트 됨 + localStorage에서 보관하는 searchHistory에도 추가사키기
  // 만약에 SearchResult에 결과가 아무것도 없다면 SearchResult에 글쓰기 모달 뜨는 버튼 만들기
  // -> /main에서 글쓰기를 마치면(=state.isShowNewContentModal이 바뀐다면) 다시 검색 요청이 가게....?

  return (
    <SearchWrap>
      <SearchHistory />
      <SearchInput />
      <SearchAutoComp />
      <SearchResult />
    </SearchWrap>
  );
}

export default Search;
