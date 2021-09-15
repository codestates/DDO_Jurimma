// 메인페이지에서 입력창, 입력창 자동완성, 과거 검색기록, 검색결과 보여질 부분
import styled from 'styled-components';
import SearchHistory from './SearchHistory';
import SearchInputWrap from './SearchInputWrap';
import SearchResult from './SearchResult';

const SearchWrap = styled.div`
  width: 900px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1399px) {
    width: 100%;
    background-color: green;
  }
`;

function Search() {
  return (
    <SearchWrap>
      <SearchHistory />
      <SearchInputWrap />
      <SearchResult />
    </SearchWrap>
  );
}

export default Search;
