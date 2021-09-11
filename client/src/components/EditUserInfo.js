// EditMyPage에서 유저 정보 변경하는 부분
import styled from 'styled-components';

const EditUserInfoWrap = styled.div`
  flex: 2 1 auto; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function EditUserInfo() {
  return <EditUserInfoWrap>this is EditUserInfo</EditUserInfoWrap>;
}

export default EditUserInfo;
