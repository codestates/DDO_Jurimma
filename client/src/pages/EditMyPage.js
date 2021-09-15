// 개인정보 변경 페이지
import { Redirect } from 'react-router';
import styled from 'styled-components';
import EditUserInfo from '../components/EditUserInfo';
import EditUserPic from '../components/EditUserPic';
import { useSelector } from 'react-redux';

const MypageEditWrap = styled.div`
  height: 70vh; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
`;

function MypageEdit() {
  const state = useSelector((state) => state.userInfoReducer);
  return (
    <>
      {state.isLogin ? (
        <MypageEditWrap>
          {/*this is mypageEdit*/}
          <EditUserInfo />{' '}
          {/* EditUserInfo에서 버튼이 눌리면 state 업데이트 +
          axios 요청*/}
        </MypageEditWrap>
      ) : (
        <Redirect to='/'></Redirect>
      )}
    </>
  );
}

export default MypageEdit;
