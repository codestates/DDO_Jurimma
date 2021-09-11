// 개인정보 변경 페이지
import styled from 'styled-components';

const MypageEditWrap = styled.div`
  height: 70vh; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function MypageEdit() {
  return <MypageEditWrap>this is mypageEdit</MypageEditWrap>;
}

export default MypageEdit;
