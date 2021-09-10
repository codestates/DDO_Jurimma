// 검색결과 전체 보여지는 페이지
import styled from 'styled-components';

const SearchMoreWrap = styled.div`
  height: 70vh; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function SearchMore() {
  return <SearchMoreWrap>this is searchMore page</SearchMoreWrap>;
}

export default SearchMore;
