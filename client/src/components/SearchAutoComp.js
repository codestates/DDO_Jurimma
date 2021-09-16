// Search에서 자동완성 창
import styled from 'styled-components';

const SearchAutoCompWrap = styled.div``;

const AutoComp = styled.div`
  margin-top: 20px;
  box-sizing: border-box;
  border-radius: 30px;
  background-color: #fff;
  opacity: 0.8;
  > li {
    height: 60px;
    line-height: 60px;
    padding-left: 30px;
    cursor: pointer;
    :hover {
      border-radius: 30px;
      background-color: #440a67;
      color: #fff;
    }
  }
`;

function SearchAutoComp() {
  const dummyDatas = ['자전거', '자만추', '자신만만', '자두']; // 검색결과 있는지 없는지 확인하는 용도의 데이터
  // axios할 때 지울 것

  return (
    <SearchAutoCompWrap>
      <AutoComp>
        {dummyDatas.length === 0 ? (
          <li>존재하지 않는 단어입니다.</li>
        ) : (
          dummyDatas.map((data, index) => <li key={index}>{data}</li>)
        )}
      </AutoComp>
    </SearchAutoCompWrap>
  );
  // 입력할때 마다 axios 요청 + 응답으로 받은 값 useState로 관리
  // throttling or debounce 활용 -> 입력하다가 멈춘상태가 1초이상이라면?
  // useState로 관리하는 값 렌더 해서 보여주기
  // focus 사라지면 안보이도록 하기
}

export default SearchAutoComp;
