// Search에서 자동완성 창
import styled from 'styled-components';

const SearchAutoCompWrap = styled.div`
  height: 350px;
  border: 1px solid red;
  box-sizing: border-box;
`;

function SearchAutoComp() {
  // 입력할때 마다 axios 요청 + 응답으로 받은 값 useState로 관리
  // throttling or debounce 활용 -> 입력하다가 멈춘상태가 1초이상이라면?
  // useState로 관리하는 값 렌더 해서 보여주기
  // focus 사라지면 안보이도록 하기
  return <SearchAutoCompWrap>this is SearchAutoComp</SearchAutoCompWrap>;
}

export default SearchAutoComp;
