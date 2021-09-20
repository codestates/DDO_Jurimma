// 사용자가 쓴 글 수정하는 모달
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEditContentModal,
  editContent,
  setAccessToken,
} from '../actions/index';
import mainLogo from '../images/main_logo.svg';
import '../App.css';
import axios from 'axios';
import swal from 'sweetalert';
import { useEffect } from 'react';
axios.defaults.withCredentials = true;

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

function EditContent() {
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const userContState = useSelector((state) => state.userContentReducer);
  const userInfoState = useSelector((state) => state.userInfoReducer);

  const [editCont, setEditCont] = useState(
    userContState.data.filter((el) => el.id === userContState.needEdit)[0]
      .wordMean
  );

  const closeEditContentModal = (isOpen) => {
    dispatch(setEditContentModal(isOpen));
  }; // 수정 모달 닫는 함수

  const handleEditInputValue = (e) => {
    setEditCont(e.target.value);
  }; // 입력에 따라 state 변경하는 함수

  const updateUserContent = async () => {
    let patchResult = await axios.patch(
      `${url}/meaning/me?content-id=${userContState.needEdit}`,
      {
        wordMean: editContent,
      },
      {
        headers: { authorization: `Bearer ${userInfoState.accessToken}` },
      }
    );
    if (patchResult.data.accessToken) {
      dispatch(setAccessToken(patchResult.data.accessToken));
    } // patchResult에 accessToken이 담겨오면 새로 업데이트
    closeEditContentModal(false); // 모달 끄기
    swal({
      title: '수정이 완료되었습니다!',
      icon: 'success',
    }); // swal로 안내
  }; // 수정하는 내용 axios 처리

  return (
    <EditContentBackdrop>
      <EditContentModal>
        <div className='closeBtn' onClick={() => closeEditContentModal(false)}>
          &times;
        </div>
        <Logo>
          <img src={mainLogo} />
        </Logo>
        <div id='wordName'>자만추</div>
        <textarea
          placeholder='수정할 단어의 뜻을 입력해주세요'
          value={editCont}
          onChange={(e) => handleEditInputValue(e)}
        ></textarea>
        <button onClick={updateUserContent}>저장하기</button>
      </EditContentModal>
    </EditContentBackdrop>
  );
}

export default EditContent;
