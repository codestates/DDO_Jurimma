// 사용자가 쓴 글 수정하는 모달
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEditContentModal,
  setAccessToken,
  setLogout,
} from '../actions/index';
import mainLogo from '../images/main_logo.svg';
import '../App.css';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const EditContentBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
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
    /* margin-top: 20px; */
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
const EditErrorMsg = styled.div`
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  color: red;
  text-align: center;
  font-size: max(0.8vw, 10px);
`;

function EditContent({ id, wordName, wordMean }) {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const history = useHistory();
  const userInfoState = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();
  const closeEditContentModal = (isOpen) => {
    dispatch(setEditContentModal(isOpen));
  }; // 수정 모달 닫는 함수

  const [editContent, setEditContent] = useState(wordMean);
  const [editError, setEditError] = useState('');

  const handleEditInputValue = (e) => {
    setEditContent(e.target.value); // 입력하는대로 입력 text 반영
    setEditError(''); // 입력하면 에러 메세지 사라짐
  }; // 글자 입력 + 에러메세지 없애기

  const handleKeyPressEdit = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      editMyContent();
    }
  }; // 엔터로도 axios 요청 가능하도록

  const editMyContent = async () => {
    try {
      if (editContent === wordMean) {
        setEditError('변경사항이 없습니다.');
      } else {
        const editResult = await axios.patch(
          `${url}/meaning/me?content-id=${id}`,
          {
            wordMean: editContent,
          },
          {
            headers: { authorization: `Bearer ${userInfoState.accessToken}` },
          }
        );
        if (editResult.data.accessToken) {
          dispatch(setAccessToken(editResult.data.accessToken));
        } // response에 accessToken 담겨있으면 accessToken 업데이트
        closeEditContentModal(false); // 모달 끄기
        swal({
          title: '줄임말이 변경되었습니다.',
          text: '작성한 줄임말을 확인해보세요!',
          icon: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      swal({
        title: '로그인이 만료되었습니다.',
        text: '다시 로그인을 해주세요!',
        icon: 'error',
      }).then(() => {
        dispatch(setLogout());
        history.push('/');
      }); // sweet alert로 안내하고 랜딩페이지로 리다이렉트
    }
  }; // 변경한 내용으로 axios 요청하기

  return (
    <EditContentBackdrop>
      <EditContentModal>
        <div className='closeBtn' onClick={() => closeEditContentModal(false)}>
          &times;
        </div>
        <Logo>
          <img src={mainLogo} />
        </Logo>
        <div id='wordName'>{wordName}</div>
        <textarea
          placeholder='수정할 단어의 뜻을 입력해주세요'
          value={editContent}
          onChange={(event) => handleEditInputValue(event)}
          onKeyPress={handleKeyPressEdit}
        ></textarea>
        <EditErrorMsg>{editError}</EditErrorMsg>
        <button onClick={editMyContent}>저장하기</button>
      </EditContentModal>
    </EditContentBackdrop>
  );
}

export default EditContent;
