// Mypage 안에서 유저 정보 나타날 부분
import styled from 'styled-components';

const UserInfoWrap = styled.div`
  width: 100%;
  flex: 1 1 auto;
  // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function UserInfo() {
  return <UserInfoWrap>this is userInfo</UserInfoWrap>;
}

export default UserInfo;
