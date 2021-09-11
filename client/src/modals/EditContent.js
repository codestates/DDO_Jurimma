// 사용자가 쓴 글 수정하는 모달
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setEditContentModal } from '../actions/index';

const EditContentBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  display: grid;
  place-items: center;
`;
const EditContentModal = styled.div`
  width: 50vw;
  height: 80vh;
  background-color: #fff;
`;

function EditContent() {
  const dispatch = useDispatch();
  const closeEditContentModal = (isOpen) => {
    dispatch(setEditContentModal(isOpen));
  }; // 로그인 모달 닫는 함수

  return (
    <EditContentBackdrop>
      <EditContentModal>
        <div onClick={() => closeEditContentModal(false)}>&times;</div>
        this is EditContent Modal
      </EditContentModal>
    </EditContentBackdrop>
  );
}

export default EditContent;
