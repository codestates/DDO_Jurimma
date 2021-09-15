// Search에서 자동완성 창
import styled from 'styled-components';

const SearchAutoCompWrap = styled.div`
  height: 350px;
  border: 1px solid red;
  box-sizing: border-box;
`;

function SearchAutoComp() {
  return <SearchAutoCompWrap>this is SearchAutoComp</SearchAutoCompWrap>;
}

export default SearchAutoComp;
