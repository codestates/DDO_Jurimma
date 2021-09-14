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
  @media screen and (min-width: 1680px) {
    background-color: green;
    width: 80%;
    margin: 0 auto;
  }
`;

function Search() {
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
