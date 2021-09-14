// EditMyPage에서 유저 정보 변경하는 부분
import styled from 'styled-components';
import EditUserPic from './EditUserPic';
const EditUserInfoWrap = styled.div`
  flex: 2 1 auto; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function EditUserInfo() {
  // EditUserInfo에서 버튼이 눌리면 유저 정보 state 업데이트 + axios 요청
  return (
    <EditUserInfoWrap>
      <EditUserPic />
      this is EditUserInfo
    </EditUserInfoWrap>
  );
}

export default EditUserInfo;
