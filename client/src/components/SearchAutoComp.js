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
  /* display: none; */
`;

function SearchAutoComp({ autoCompResult }) {
  return (
    <SearchAutoCompWrap>
      <AutoComp>
        {autoCompResult.map((res, idx) => {
          return <li key={idx}>{res}</li>;
        })}
      </AutoComp>
    </SearchAutoCompWrap>
  );
  // 입력할때 마다 axios 요청 + 응답으로 받은 값 useState로 관리
  // throttling or debounce 활용 -> 입력하다가 멈춘상태가 1초이상이라면?
  // useState로 관리하는 값 렌더 해서 보여주기
  // focus 사라지면 안보이도록 하기
}

export default SearchAutoComp;
