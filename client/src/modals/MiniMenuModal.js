// 사용자가 쓴 글 수정하는 모달
import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMiniMenuModal,
  setLoginOrSignupModal,
  setQuizModal,
  setLogoutModal,
} from '../actions/index';
import { Link } from 'react-router-dom';
import silverProfile from '../images/junior_profile.svg';
import goldProfile from '../images/senior_profile.svg';
import diaProfile from '../images/master_profile.svg';
import '../App.css';
import swal from 'sweetalert';

const MiniMenuWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 20;
  display: flex;
  flex-direction: column;
  > .closeBtnWrap {
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-end;
    z-index: 30;
    font-size: 50px;
    > .closeBtn {
      width: 60px;
      height: 60px;
      color: #440a67;
      cursor: pointer;
      text-align: center;
      line-height: 60px;
      transition: 0.5s;
    }
    > .closeBtn:hover {
      transform: rotate(-90deg);
    }
  }
  > .closeBtn:hover {
    transform: rotate(-90deg);
  }
`;

const MiniMenuProfile = styled.div`
  flex: 1 1 auto;
  z-index: 30;
  background-color: red;
  > #miniMenuProfile {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    > #profileImg {
      width: 200px;
      height: 500px;
      background-color: #ddd;
    }
    > #myProfileWrap {
      width: 100%;
      display: flex;
      background-color: pink;
      > a {
        flex: 1 1 auto;
        text-decoration: none;
        border-radius: 50px;
        display: block;
        border: 4px solid #440a67;
        color: #440a67;
        background-color: transparent;
        text-align: center;
        line-height: 60px;
        font-size: max(1.2vw, 18px);
        font-family: 'NEXON Lv2 Gothic Bold';
        transition: 0.3s;
        :hover {
          color: #fff;
          background-color: #440a67;
        }
      }
      > .logout {
        flex: 1 1 auto;
        border-radius: 50px;
        margin-left: 10px;
        border: 4px solid #440a67;
        line-height: 60px;
        color: #440a67;
        background-color: transparent;
        text-align: center;
        font-size: max(1.2vw, 18px);
        font-family: 'NEXON Lv2 Gothic Bold';
        transition: 0.3s;
        cursor: pointer;
        :hover {
          color: #fff;
          background-color: #440a67;
        }
      }
    }
    > .menu {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-radius: 50px;
      text-align: center;
      font-size: max(1.2vw, 18px);
      font-family: 'NEXON Lv2 Gothic Bold';
      transition: 0.5s;
      border: 4px solid #440a67;
      color: #440a67;
      background-color: transparent;
      cursor: pointer;
      margin-top: 30px;
      > a {
        width: 100%;
        height: 100%;
        display: block;
        text-decoration-line: none;
        color: #440a67;
      }
      > a:hover {
        color: #fff; // main 부분
      }
    }
    > .menu:nth-child(1) {
      margin-top: 0;
    }
    > .menu:hover {
      background-color: #440a67;
      border: 4px solid #440a67;
      color: #fff; // login, quiz 부분
    }
  }
`;

function MiniMenuModal() {
  const nowDate = new Date().toLocaleDateString();
  const state = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();
  const openQuizModal = (isOpen) => {
    if (state.isLogin === false) {
      swal({
        title: '로그인이 필요합니다.',
        text: '로그인 후에 오늘의 퀴즈를 풀어보세요!',
        icon: 'warning',
      });
    } else if (nowDate === state.userInfo.quizDate) {
      swal({
        title: '이미 퀴즈를 진행하였습니다.',
        text: '내일 다시 도전해주세요!',
        icon: 'warning',
      });
    } else {
      // 로그인 되어있고 최근 퀴즈를 푼 날짜가 오늘 날짜와 다를때만 실행
      dispatch(setQuizModal(isOpen));
      dispatch(setMiniMenuModal(false));
    }
  }; // 퀴즈 모달 열면서 Mini Modal을 끄는 함수

  const openLoginOrSignupModal = (isOpen) => {
    dispatch(setLoginOrSignupModal(isOpen));
    dispatch(setMiniMenuModal(false));
  }; // 로그인 모달 열면서 Mini Modal을 끄는 함수

  const openLogoutModal = (isOpen) => {
    dispatch(setLogoutModal(isOpen));
    dispatch(setMiniMenuModal(false));
  }; // 로그아웃 모달 열면서 Mini Modal을 끄는 함수
  const closeMiniMenuModal = (isOpen) => {
    dispatch(setMiniMenuModal(isOpen));
  }; // mini Modal 모달 닫는 함수

  window.onresize = function () {
    var innerWidth = window.innerWidth;
    innerWidth <= '800'
      ? dispatch(setMiniMenuModal(false))
      : dispatch(setMiniMenuModal(false));
  };

  let whatProfile;
  if (0 <= state.userInfo.experience && state.userInfo.experience < 100) {
    whatProfile = silverProfile;
  } else if (
    100 <= state.userInfo.experience &&
    state.userInfo.experience < 200
  ) {
    whatProfile = goldProfile;
  } else {
    whatProfile = diaProfile;
  } // 나타낼 레벨 정하기

  return (
    <MiniMenuWrap>
      <div className='closeBtnWrap'>
        <div className='closeBtn' onClick={() => closeMiniMenuModal(false)}>
          &times;
        </div>
      </div>

      <MiniMenuProfile>
        <div id='miniMenuProfile'>
          {state.isLogin ? (
            <>
              <div id='profileImg'></div>
              <div id='myProfileWrap'>
                <Link to='/mypage' onClick={() => closeMiniMenuModal(false)}>
                  Mypage
                </Link>
                <div className='logout' onClick={() => openLogoutModal(true)}>
                  Logout
                </div>
              </div>
            </>
          ) : (
            <div className='menu' onClick={() => openLoginOrSignupModal(true)}>
              Login
            </div>
          )}
          <div className='menu'>
            <Link to='/main' onClick={() => closeMiniMenuModal(false)}>
              Main
            </Link>
          </div>
          <div className='menu' onClick={() => openQuizModal(true)}>
            Quiz
          </div>
        </div>
      </MiniMenuProfile>
    </MiniMenuWrap>
  );
}

export default MiniMenuModal;
