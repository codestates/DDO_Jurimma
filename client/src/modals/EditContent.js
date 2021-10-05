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
  width: 500px;
  height: 600px;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  @media screen and (max-width: 600px) {
    width: 94%;
  }
  > .closeBtn {
    z-index: 10;
    font-size: 50px;
    position: absolute;
    right: -40px;
    top: -40px;
    color: #fff;
    cursor: pointer;
    transition: 0.5s;
    @media screen and (max-width: 700px) {
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

function EditContent({
  id,
  wordName,
  wordMean,
  stateCheck,
  setStateCheck,
  setEditAndDelState,
}) {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const userInfoState = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();
  const closeEditContentModal = (isOpen) => {
    dispatch(setEditContentModal(isOpen));
  };

  const [editContent, setEditContent] = useState(wordMean);
  const [editError, setEditError] = useState('');

  const handleEditInputValue = (e) => {
    setEditContent(e.target.value);
    setEditError('');
  };

  const handleKeyPressEdit = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      editMyContent();
    }
  };

  const editMyContent = async () => {
    try {
      if (editContent === wordMean) {
        setEditError('변경사항이 없습니다.');
      } else {
        const editResult = await axios.patch(
          `${url}/meaning/${id}`,
          {
            wordMean: editContent,
          },
          {
            headers: { authorization: `Bearer ${userInfoState.accessToken}` },
          }
        );
        if (editResult.data.accessToken) {
          dispatch(setAccessToken(editResult.data.accessToken));
        }
        swal({
          title: '줄임말이 변경되었습니다.',
          text: '작성한 줄임말을 확인해보세요!',
          icon: 'success',
        }).then(() => {
          closeEditContentModal(false);
          setEditAndDelState(true);
          setStateCheck(!stateCheck);
        });
      }
    } catch (error) {
      if (error.response.data.message === 'Send new Login Request') {
        swal({
          title: '로그인이 필요합니다.',
          text: '로그인이 만료되었습니다.',
          icon: 'warning',
        }).then(() => {
          dispatch(setLogout());
          window.location.replace('/');
        });
      } else {
        swal({
          title: 'Internal Server Error',
          text: '죄송합니다. 다시 로그인해주세요.',
          icon: 'warning',
        }).then(() => {
          dispatch(setLogout());
          window.location.replace('/');
        });
      }
    }
  };

  return (
    <EditContentBackdrop>
      <EditContentModal>
        <div className='closeBtn' onClick={() => closeEditContentModal(false)}>
          &times;
        </div>
        <Logo>
          <img src={mainLogo} alt='Logo' />
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
