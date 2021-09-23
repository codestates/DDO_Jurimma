// Search에서 자동완성 창
import styled from 'styled-components';

const SearchAutoCompWrap = styled.div``;

const AutoComp = styled.div`
  width: 100%;
  z-index: 3;
  box-sizing: border-box;
  border-radius: 30px;
  background-color: #fff;
  margin-top: 5px;
  > li {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    cursor: pointer;
    :hover {
      border-radius: 30px;
      background-color: #440a67;
      color: #fff;
      opacity: 0.3;
    }
    &.selected {
      border-radius: 30px;
      background-color: #440a67;
      color: #fff;
    }
  }
`;

function SearchAutoComp({ autoCompResult, setWord, selected }) {
  return (
    <SearchAutoCompWrap>
      <AutoComp>
        {autoCompResult.map((data, index) => {
          return (
            <li
              key={index}
              className={selected === index ? 'selected' : ''}
              value={data}
              onClick={() => setWord(data)}
            >
              {data}
            </li>
          );
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
