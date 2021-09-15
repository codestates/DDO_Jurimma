// 과거 검색결과 보관
import styled from 'styled-components';

const SearchHistoryWrap = styled.div`
  flex: 1 1 auto; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  border: 1px solid red;
  box-sizing: border-box;
  @media only screen and (max-width: 1399px) {
    width: 100%;
    background-color: green;
  }
`;

function SearchHistory() {
  return <SearchHistoryWrap>this is SearchHistory</SearchHistoryWrap>;
}

export default SearchHistory;
