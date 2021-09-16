// 회원 탈퇴 모달
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSignOutModal } from '../actions/index';

const SignoutBackdrop = styled.div`
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

const SignoutModal = styled.div`
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
    width: 40%;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    line-height: 50px;
    font-size: max(1vw, 14px);
    cursor: default;
    background-color: #440a67;
    color: #fff;
    border-radius: 10px;
    font-family: 'NEXON Lv2 Gothic Bold';
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

function Signout() {
  const dispatch = useDispatch();
  const closeEditContentModal = (isOpen) => {
    dispatch(setSignOutModal(isOpen));
  }; // 로그인 모달 닫는 함수

  return (
    <SignoutBackdrop>
      <SignoutModal>
        <div className='closeBtn' onClick={() => closeEditContentModal(false)}>
          &times;
        </div>
        <Logo></Logo>
        <div id='wordName'>자만추</div>
        <textarea placeholder='수정할 단어의 뜻을 입력해주세요'></textarea>
        <button>저장하기</button>
      </SignoutModal>
    </SignoutBackdrop>
  );
}

export default Signout;
