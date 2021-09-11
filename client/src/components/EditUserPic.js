// EditMyPage에서 사진 변경 일어나는 부분
import styled from 'styled-components';

const EditUserPicWrap = styled.div`
  flex: 1 1 auto; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function EditUserPic() {
  return <EditUserPicWrap>this is EditUserPic</EditUserPicWrap>;
}

export default EditUserPic;
