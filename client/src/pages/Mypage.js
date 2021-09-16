// 개인정보 확인 및 작성한 글 보이는 페이지
import UserInfo from '../components/UserInfo';
import UserContents from '../components/UserContents';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MypageWrap = styled.div`
  height: 100vh; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-top: 150px;
`;

function Mypage() {
  const state = useSelector((state) => state.userInfoReducer);
  // /mypage로 들어가면 갖고있던 state로 userInfo 렌더해서 보여주기, userContent는 axios 요청하기(들어올때 한번만) + userContentReducer 업데이트

  // 만약 내가 쓴 글 수정하는 isShowEditContentModal상태가 꺼진 상태라면 state 업데이트 + axios로 글 수정 요청
  // 만약 글을 삭제하면 state 업데이트 + axios로 글 없애기 요청
  console.log(state);

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
        <Redirect to='/main' /> // 로그인상태 X라면 메인페이지로 되돌아감
      )}
    </>
  );
}

export default Mypage;
