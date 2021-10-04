// EditMyPage에서 유저 정보 변경하는 부분
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { setAccessToken, setLogout } from '../actions/index';
import checkModule from '../checkModule';
import swal from 'sweetalert';
import axios from 'axios';
import nothingImg from '../images/nothing.svg';
import '../App.css';
axios.defaults.withCredentials = true;

const colorAni = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

const EditUserInfoWrap = styled.div`
  width: 900px;
  height: 580px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1399px) {
    margin: 0 auto;
    margin-top: 30px;
    width: 90%;
    height: 600px;
  }
`;

const EditUserInfoBox = styled.div`
  width: max(60%, 320px);
  margin: 0 auto;
  height: 83%;
  > #nothingImg {
    width: 300px;
    height: 300px;
    background: url(${nothingImg});
    margin: 0 auto;
    margin-top: 60px;
    cursor: not-allowed;
    @media only screen and (max-width: 500px) {
      width: 250px;
      height: 250px;
    }
    @media only screen and (max-width: 350px) {
      width: 200px;
      height: 200px;
    }
  }
  > #letter {
    color: #fff;
    width: 100%;
    height: 60px;
    /* border: 2px solid #fff;
    border-radius: 20px; */
    line-height: 60px;
    margin: 0 auto;
    font-size: 15px;
    text-align: center;
    transition: 0.3s;
    cursor: not-allowed;
    @media only screen and (max-width: 500px) {
      font-size: 12px;
      line-height: 20px;
    }
  }
  > #buttonWrap {
    width: 430px;
    margin: 0 auto;
    margin-top: 50px;
    @media only screen and (max-width: 1000px) {
      width: 80%;
    }
    > button {
      width: 200px;
      height: 50px;
      margin-left: 30px;
      border-radius: 50px;
      background-color: #fff;
      cursor: pointer;
      transition: 0.3s;
      color: #440a67;
      @media only screen and (max-width: 1000px) {
        width: 48%;
        margin-left: 4%;
      }
    }
    > button:nth-child(1) {
      margin-left: 0;
      color: #fff;
      border: 2px solid #fff;
    }
  }
  > input {
    width: 100%;
    height: 50px;
    outline: none;
    font-size: 12px;
    background-color: transparent;
    border-bottom: 2px solid #fff;
    margin-top: 30px;
    color: #fff;
    padding-left: 5px;
    @media only screen and (max-width: 400px) {
      font-size: 11px;
    }
  }
  > input::-webkit-input-placeholder {
    color: #fff;
  }
  > input:focus::-webkit-input-placeholder {
    color: transparent;
  }
  > input:hover::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    font-size: 13px;
    transition: 0.3s;
  }
  > #rePasswordWrap {
    margin-top: 30px;
    width: 100%;
    margin: 0 auto;
    > input {
      display: inline-block;
      width: 48%;
      margin-left: 4%;
      height: 50px;
      margin-top: 30px;
      background-color: transparent;
      border-bottom: 2px solid #fff;
      font-size: 12px;
      outline: none;
      color: #fff;
      padding-left: 5px;
      @media only screen and (max-width: 1000px) {
        width: 100%;
        margin-left: 0;
      }
      @media only screen and (max-width: 400px) {
        font-size: 11px;
      }
    }
    > input::-webkit-input-placeholder {
      color: #fff;
    }
    > input:focus::-webkit-input-placeholder {
      color: transparent;
    }
    > input:hover::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      font-size: 13px;
      transition: 0.3s;
    }
    > input:nth-child(1) {
      margin-left: 0;
    }
  }
`;
const OldUserName = styled.div`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  background-size: 200% 100%;
  animation: ${colorAni} 5s ease infinite;
  text-align: center;
  line-height: 60px;
  color: #fff;
  border-radius: 20px;
  border: 2px solid #fff;
  @media only screen and (max-width: 400px) {
    font-size: 14px;
  }
  > span {
    color: #fff;
    font-size: 13px;
    @media only screen and (max-width: 400px) {
      font-size: 11px;
    }
  }
`;
// 레벨별 그라디언트를 다르게 줘야하는데, 이 styled component가 기존의 것처럼 밖에 있으면 애니메이션 효과가 구현되지 않아, 이것만 함수 안에 넣음.

function EditUserInfo() {
  // EditUserInfo에서 버튼이 눌리면 유저 정보 state 업데이트 + axios 요청
  const state = useSelector((state) => state.userInfoReducer);
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const history = useHistory();
  const dispatch = useDispatch();
  const [editUser, setEditUser] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
    newPasswordRe: '',
  });

  let whatColor;
  let whatHoverColor;
  if (0 <= state.userInfo.experience && state.userInfo.experience < 100) {
    whatColor = 'linear-gradient(-45deg, #5591C9, #245689)';
    whatHoverColor = 'linear-gradient(-45deg, #fff, #5591C9, #245689)';
  } else if (
    100 <= state.userInfo.experience &&
    state.userInfo.experience < 200
  ) {
    whatColor = 'linear-gradient(-45deg, #ffc851, #FF1515)';
    whatHoverColor = 'linear-gradient(-45deg, #fff, #ffc851, #FF1515)';
  } else {
    whatColor = 'linear-gradient(-45deg, #3FC1FF, #D42AFF)';
    whatHoverColor = 'linear-gradient(-45deg, #fff, #3FC1FF, #D42AFF)';
  }

  const handleKeyPressEdit = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      handleEdit();
    }
  };

  const handleEditInputValue = (key) => (e) => {
    setEditUser({ ...editUser, [key]: e.target.value });
  };

  const oauthEdit = () => {
    swal({
      title: '유저 정보를 수정할 수 없습니다',
      text: '소셜 로그인의 경우 정보를 수정할 수 없습니다.',
      icon: 'warning',
    });
  };
  const [isHover, setIsHover] = useState(false);

  const handleEdit = async () => {
    try {
      if (
        editUser.username === '' ||
        editUser.oldPassword === '' ||
        editUser.newPassword === '' ||
        editUser.newPasswordRe === ''
      ) {
        swal({
          title: '입력하지 않은 정보가 존재합니다.',
          text: '정보를 모두 입력해주세요!',
          icon: 'warning',
        });
      } else if (checkModule.OnlyKorEng(editUser.username) === false) {
        swal({
          title: '유효하지 않은 이름입니다.',
          text: '변경할 이름을 다시 한번 확인해주세요!',
          icon: 'warning',
        });
      } else if (
        checkModule.IsValidatePassword(editUser.newPassword) === false
      ) {
        swal({
          title: '유효하지 않은 비밀번호입니다.',
          text: '변경할 비밀번호를 다시 한번 확인해주세요!',
          icon: 'warning',
        });
        setEditUser({
          ...editUser,
          newPassword: '',
          newPasswordRe: '',
        });
      } else if (editUser.newPassword !== editUser.newPasswordRe) {
        swal({
          title: '비밀번호가 틀렸습니다.',
          text: '변경할 비밀번호를 다시 한번 확인해주세요!',
          icon: 'warning',
        });
        setEditUser({
          ...editUser,
          newPassword: '',
          newPasswordRe: '',
        });
      } else {
        const editRes = await axios({
          url: `${url}/user`,
          method: 'patch',
          headers: { authorization: `Bearer ${state.accessToken}` },
          data: editUser,
        });
        if (editRes.data.accessToken) {
          dispatch(setAccessToken(editRes.data.accessToken));
        }
        swal({
          title: '정보가 성공적으로 업데이트 되었습니다.',
          text: '다시 로그인해주세요',
          icon: 'success',
        });
        await axios.get(`${url}/user/logout`, {
          headers: { authorization: `Bearer ${state.accessToken}` },
        });
        dispatch(setLogout());
        history.push('/');
      }
    } catch (error) {
      if (error.response.data.message === 'Wrong Password') {
        swal({
          title: '비밀번호가 틀렸습니다.',
          text: '기존 비밀번호를 다시 한번 확인해주세요!',
          icon: 'warning',
        }).then(() => {
          setEditUser({
            ...editUser,
            oldPassword: '',
          });
        });
      } else if (error.response.data.message === 'Send new Login Request') {
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

  const handleCancel = () => {
    setEditUser({
      username: '',
      oldPassword: '',
      newPassword: '',
      newPasswordRe: '',
    });
    history.push('/mypage');
  };

  return (
    <EditUserInfoWrap>
      <EditUserInfoBox>
        {state.userInfo.isOAuth ? (
          <>
            <OldUserName style={{ backgroundImage: whatColor }}>
              {state.userInfo.username}
              <span>님, 수정을 원하시나요?</span>
            </OldUserName>
            <div id='nothingImg'></div>
            <div id='letter'>
              소셜 로그인은 프로필 이외 정보를 수정할 수 없습니다.
            </div>
          </>
        ) : (
          <>
            <OldUserName style={{ backgroundImage: whatColor }}>
              {state.userInfo.username}
              <span>님, 수정을 원하시나요?</span>
            </OldUserName>
            <input
              type='text'
              onChange={handleEditInputValue('username')}
              onKeyPress={handleKeyPressEdit}
              value={editUser.username}
              placeholder='변경할 이름 (영문과 한글만 입력 가능)'
            ></input>
            <input
              type='password'
              onChange={handleEditInputValue('oldPassword')}
              onKeyPress={handleKeyPressEdit}
              value={editUser.oldPassword}
              placeholder='기존 비밀번호'
            ></input>
            <input
              type='password'
              onChange={handleEditInputValue('newPassword')}
              onKeyPress={handleKeyPressEdit}
              value={editUser.newPassword}
              placeholder='변경할 비밀번호 (최소 8자이상, 대문자, 특수문자 포함)'
            ></input>
            <input
              type='password'
              placeholder='변경할 비밀번호 확인'
              onChange={handleEditInputValue('newPasswordRe')}
              onKeyPress={handleKeyPressEdit}
              value={editUser.newPasswordRe}
            ></input>
            <div id='buttonWrap'>
              <button
                onClick={state.userInfo.isOAuth ? oauthEdit : handleEdit}
                style={
                  isHover
                    ? { backgroundImage: whatHoverColor }
                    : { backgroundImage: whatColor }
                }
                onMouseOver={() => setIsHover(true)}
                onMouseOut={() => setIsHover(false)}
              >
                저장하기
              </button>
              <button onClick={handleCancel}>취소하기</button>
            </div>
          </>
        )}
      </EditUserInfoBox>
    </EditUserInfoWrap>
  );
}

export default EditUserInfo;
