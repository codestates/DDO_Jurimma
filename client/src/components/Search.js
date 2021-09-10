// 메인페이지에서 입력창, 입력창 자동완성, 과거 검색기록, 검색결과 보여질 부분
import styled from 'styled-components';
import SearchAutoComp from './SearchAutoComp';
import SearchHistory from './SearchHistory';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

const SearchWrap = styled.div`
  flex: 3 1 auto; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
