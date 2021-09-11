// Search에서 검색창 부분
import styled from 'styled-components';

const SearchInputWrap = styled.div`
  flex: 0.5 1 auto; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function SearchInput() {
  return <SearchInputWrap>this is SearchInput</SearchInputWrap>;
}

export default SearchInput;
