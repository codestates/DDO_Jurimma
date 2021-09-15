// 사용자가 새로운 글을 쓰는 모달
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setNewContentModal } from '../actions/index';

const NewContentBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  display: grid;
  place-items: center;
`;
const NewContentModal = styled.div`
  width: 50vw;
  height: 80vh;
  background-color: #fff;
`;

function NewContent() {
  const dispatch = useDispatch();
  const closeNewContentModal = (isOpen) => {
    dispatch(setNewContentModal(isOpen));
  }; // 새로 글쓰는 모달 닫는 함수

  return (
    <NewContentBackdrop>
      <NewContentModal>
        <div onClick={() => closeNewContentModal(false)}>&times;</div>
        this is NewContent Modal
      </NewContentModal>
    </NewContentBackdrop>
  );
}

export default NewContent;
