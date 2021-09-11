// Search에서 자동완성 창
import styled from 'styled-components';

const SearchAutoCompWrap = styled.div`
  flex: 1 1 auto; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function SearchAutoComp() {
  return <SearchAutoCompWrap>this is SearchAutoComp</SearchAutoCompWrap>;
}

export default SearchAutoComp;
