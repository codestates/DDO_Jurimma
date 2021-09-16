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
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 20;
`;
const EditContentModal = styled.div`
  width: max(40vw, 350px);
  height: 600px;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  > .closeBtn {
    z-index: 10;
    font-size: 50px;
    position: absolute;
    right: -40px;
    top: -40px;
    color: #fff;
    cursor: pointer;
    transition: 0.5s;
    @media screen and (max-width: 479px) {
      right: 10px;
      top: 5px;
      color: #000;
      font-size: 30px;
    }
  }
  > .closeBtn:hover {
    transform: rotate(-90deg);
  }
  > #wordName {
    height: 50px;
    background-color: orange;
    width: 90%;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    line-height: 50px;
  }
  > textarea {
    width: 90%;
    height: 300px;
    margin: 0 auto;
    text-align: top;
    background-color: pink;
    outline: none;
    margin-top: 20px;
  }
  > button {
    width: 50%;
    height: 50px;
    width: 200px;
    margin: 0 auto;
    margin-top: 20px;
    cursor: pointer;
  }
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background-color: red;
  margin-top: 20px;
`;

function EditContent() {
  const dispatch = useDispatch();
  const closeEditContentModal = (isOpen) => {
    dispatch(setEditContentModal(isOpen));
  }; // 로그인 모달 닫는 함수

  return (
    <EditContentBackdrop>
      <EditContentModal>
        <div className='closeBtn' onClick={() => closeEditContentModal(false)}>
          &times;
        </div>
        <Logo>로고로고</Logo>
        <div id='wordName'>자만추</div>
        <textarea placeholder='수정할 단어의 뜻을 입력해주세요'></textarea>
        <button>저장하기</button>
      </EditContentModal>
    </EditContentBackdrop>
  );
}

export default EditContent;
