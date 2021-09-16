// Chart 안에 실시간 순위 보여질 부분
import styled from 'styled-components';

const BestSearchWrap = styled.div`
  flex: 5 1 auto; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function BestSearch({ realTime }) {
  // axios로 가장 많이 검색된 단어들 요청 전송
  // useEffect + setInterval로 1분마다 요청 전송 가도록 만들기
  // 받아오는 값을 담당하는 state 준비 -> 이 state 렌더링 해서 보여주기
  // 참고 : https://velog.io/@dongdong98/React-Hook%EC%97%90%EC%84%9C-setInterval-setTimeout%EC%9D%84-%ED%98%84%EB%AA%85%ED%95%98%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95
  return (
    <BestSearchWrap>
      {realTime.map((el) => {
        return <li key={el.id}>{el.wordName}</li>;
      })}
    </BestSearchWrap>
  );
}

export default BestSearch;
