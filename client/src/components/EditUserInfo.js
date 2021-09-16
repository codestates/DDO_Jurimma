// EditMyPage에서 유저 정보 변경하는 부분
import styled from 'styled-components';
const EditUserInfoWrap = styled.div`
  width: 900px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: orange;
  @media only screen and (max-width: 1399px) {
    width: 100%;
  }
`;

function EditUserInfo() {
  // EditUserInfo에서 버튼이 눌리면 유저 정보 state 업데이트 + axios 요청
  return <EditUserInfoWrap></EditUserInfoWrap>;
}

export default EditUserInfo;
