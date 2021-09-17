// Mypage에서 유저가 쓴 글 목록
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setEditContentModal } from '../actions/index';

const UserContentsWrap = styled.div`
  width: max(375px, 100%);
  max-width: 1080px;
  margin: 0 auto;
  // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  flex: 4 1 auto;
  border: 1px solid red;
  box-sizing: border-box;
`;

function UserContents() {
  const dispatch = useDispatch();
  const openEditContentModal = (isOpen) => {
    dispatch(setEditContentModal(isOpen));
  }; // 수정 모달 여는 함수

  return (
    <UserContentsWrap>
      this is userContents
      {/* 수정하기 버튼은 유저가 쓴 글이 mapping 된 div에 각각 들어가 있어야 함 */}
      <button onClick={() => openEditContentModal(true)}>
        내가 쓴 글 수정하기
      </button>
    </UserContentsWrap>
  );
}

export default UserContents;
