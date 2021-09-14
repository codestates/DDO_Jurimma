// Search에서 자동완성 창
import styled from 'styled-components';

const SearchAutoCompWrap = styled.div`
  flex: 1 1 auto; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
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
