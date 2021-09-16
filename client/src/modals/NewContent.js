// 사용자가 새로운 글을 쓰는 모달
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setNewContentModal } from '../actions/index';
import mainLogo from '../images/main_logo.svg';

const NewContentBackdrop = styled.div`
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

const NewContentModal = styled.div`
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
  > #inputWrap {
    height: 40px;
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
    display: inline-block;
    ::after {
      display: block;
      content: '';
      border-bottom: solid 3px #440a67;
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
    }
    :hover:after {
      transform: scaleX(1);
    }
    > input {
      height: 40px;
      width: 90%;
      display: block;
      margin: 0 auto;
      text-align: center;
      outline: none;
      font-size: max(1vw, 13px);
      :focus::-webkit-input-placeholder {
        color: transparent;
      }
    }
  }

  > textarea {
    width: 90%;
    height: 300px;
    margin: 0 auto;
    text-align: top;
    outline: none;
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #440a67;
    font-size: max(0.85vw, 12px);
    border-radius: 20px;
    :focus::-webkit-input-placeholder {
      color: transparent;
    }
    :focus {
      border: 2px solid #440a67;
    }
  }
  > button {
    width: 50%;
    height: 50px;
    width: 200px;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 50px;
    background-color: transparent;
    background-color: #440a67;
    color: #fff;
    transition: 0.3s;
    font-size: max(0.85vw, 12px);
    margin-top: 20px;
  }
  > button:hover {
    background-color: #230638;
    color: #fff;
  }
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-top: 20px;
`;

function NewContent() {
  const dispatch = useDispatch();
  const closeNewContentModal = (isOpen) => {
    dispatch(setNewContentModal(isOpen));
  }; // 새로 글쓰는 모달 닫는 함수

  return (
    <NewContentBackdrop>
      <NewContentModal>
        <div className='closeBtn' onClick={() => closeNewContentModal(false)}>
          &times;
        </div>
        <Logo>
          <img src={mainLogo} />
        </Logo>
        <div id='inputWrap'>
          <input type='text' placeholder='작성할 단어를 입력해주세요'></input>
        </div>
        <textarea placeholder='작성할 단어의 뜻을 입력해주세요'></textarea>
        <button>저장하기</button>
      </NewContentModal>
    </NewContentBackdrop>
  );
}

export default NewContent;
