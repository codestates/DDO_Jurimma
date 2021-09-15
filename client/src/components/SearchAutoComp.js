// Search에서 자동완성 창
import styled from 'styled-components';

const SearchAutoCompWrap = styled.div`
  height: 350px;
`;

const AutoComp = styled.div`
  margin-top: 20px;
  height: 350px;
  box-sizing: border-box;
  border-radius: 40px;
  background-color: #fff;
  border: 5px solid #b4aee8;
  display: none;
`;

function SearchAutoComp() {
  return (
    <SearchAutoCompWrap>
      <AutoComp></AutoComp>
    </SearchAutoCompWrap>
  );
}

export default SearchAutoComp;
