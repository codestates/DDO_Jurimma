// 개인정보 확인 및 작성한 글 보이는 페이지
import UserInfo from '../components/UserInfo';
import UserContents from '../components/UserContents';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MypageWrap = styled.div`
  height: 70vh; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

function Mypage() {
  const state = useSelector((state) => state.userInfoReducer);
  return (
    <>
      {state.isLogin ? (
        <MypageWrap>
          <div>
            this is mypage
            <button>
              <Link to='/mypageEdit'>수정하기</Link>
            </button>
          </div>
          <UserInfo />
          <UserContents />
        </MypageWrap>
      ) : (
        <Redirect to='/'></Redirect> // 로그인상태 X라면 랜딩페이지로 되돌아감
      )}
    </>
  );
}

export default Mypage;
