// 개인정보 확인 및 작성한 글 보이는 페이지
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MypageWrap = styled.div`
  height: 70vh; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function Mypage() {
  return (
    <MypageWrap>
      this is mypage
      <div>
        <Link to='/mypageEdit'>수정하기</Link>
      </div>
    </MypageWrap>
  );
}

export default Mypage;
