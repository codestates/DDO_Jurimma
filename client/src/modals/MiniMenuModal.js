// 사용자가 쓴 글 수정하는 모달
import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import basicProfile from '../images/basic_profileImg.svg';
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
  > #miniMenuProfile {
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -100px;
    > #profileImgLevel {
      width: 350px;
      height: 350px;
      background-color: #ddd;
      > #profileImg {
        width: 110px;
        height: 110px;
        border-radius: 300px;
        margin: 0 auto;
        background-repeat: no-repeat;
        background-size: cover;
        margin-top: 133px;
      }
    }
    > .menu {
      width: 100%;
      height: 50px;
      line-height: 48px;
      border-radius: 50px;
      text-align: center;
      font-size: max(1.2vw, 18px);
      font-family: 'NEXON Lv2 Gothic Bold';
      background-color: transparent;
      cursor: pointer;
      margin-top: 30px;
      border: 4px solid transparent;
      border-radius: 50px;
      background: linear-gradient(#fff, #fff),
        linear-gradient(-45deg, #440a67, #b4aee8);
      background-origin: border-box;
      background-clip: content-box, border-box;
      color: #440a67;
      transition: 0.5s;
      > a {
        width: 100%;
        height: 100%;
        display: block;
        text-decoration-line: none;
        color: #440a67;
      }
      > a:hover {
        color: #fff;
      }
    }
    > .menu:nth-child(1) {
      margin-top: 0;
    }
    > .menu:hover {
      background: linear-gradient(#440a67, #440a67),
        linear-gradient(-45deg, #440a67, #b4aee8);
      border: 4px solid #b4aee8;
      color: #fff;
    }
  }
`;

const MyProfileWrap = styled.div`
  width: 100%;
  display: flex;
  margin-top: -30px;
  height: 50px;
  > a {
    flex: 1 1 auto;
    text-decoration: none;
    display: block;
    text-align: center;
    line-height: 48px;
    font-size: max(1.2vw, 18px);
    font-family: 'NEXON Lv2 Gothic Bold';
    border: 4px solid transparent;
    border-radius: 50px;
    background: linear-gradient(#fff, #fff),
      linear-gradient(-45deg, #440a67, #b4aee8);
    background-origin: border-box;
    background-clip: content-box, border-box;
    color: #440a67;
    transition: 0.5s;
    :hover {
      background: linear-gradient(#440a67, #440a67),
        linear-gradient(-45deg, #440a67, #b4aee8);
      border: 4px solid #b4aee8;
      color: #fff;
    }
  }
  > .logout {
    flex: 1 1 auto;
    margin-left: 10px;
    line-height: 48px;
    color: #440a67;
    text-align: center;
    font-size: max(1.2vw, 18px);
    font-family: 'NEXON Lv2 Gothic Bold';
    transition: 0.5s;
    cursor: pointer;
    border: 4px solid transparent;
    border-radius: 50px;
    background: linear-gradient(#fff, #fff),
      linear-gradient(-45deg, #440a67, #b4aee8);
    background-origin: border-box;
    background-clip: content-box, border-box;
    color: #440a67;
    :hover {
      background: linear-gradient(#440a67, #440a67),
        linear-gradient(-45deg, #440a67, #b4aee8);
      border: 4px solid #b4aee8;
      color: #fff;
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

  const [isHover, setIsHover] = useState(false);

  let whatProfile;
  let whatColor;
  let whatFontColor;
  if (0 <= state.userInfo.experience && state.userInfo.experience < 100) {
    whatProfile = silverProfile;
    whatColor =
      'linear-gradient(#fff, #fff), linear-gradient(-45deg, #5591C9, #245689)';
    whatFontColor = '#5591C9';
  } else if (
    100 <= state.userInfo.experience &&
    state.userInfo.experience < 200
  ) {
    whatProfile = goldProfile;
    whatColor =
      'linear-gradient(#fff, #fff), linear-gradient(-45deg, #ffc851, #FF1515)';
    whatFontColor = '#ffc851';
  } else {
    whatProfile = diaProfile;
    whatColor =
      'linear-gradient(#fff, #fff), linear-gradient(-45deg, #3FC1FF, #D42AFF)';
    whatFontColor = '#3FC1FF';
  } // 나타낼 레벨 정하기

  let myProfileImg;
  if (state.userInfo.userPic === null) {
    myProfileImg = basicProfile;
  } else {
    myProfileImg = state.userInfo.userPic;
  }
  // 유저가 프로필 이미지를 가지고 있지 않을 때

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
              <div
                id='profileImgLevel'
                style={{
                  background: `url(${whatProfile})`,
                  backgroundSize: 'cover',
                }}
              >
                <div
                  id='profileImg'
                  style={{
                    background: `url(${myProfileImg})`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </div>
              <MyProfileWrap>
                <Link to='/mypage' onClick={() => closeMiniMenuModal(false)}>
                  Mypage
                </Link>
                <div className='logout' onClick={() => openLogoutModal(true)}>
                  Logout
                </div>
              </MyProfileWrap>

              <div className='menu'>
                <Link to='/main' onClick={() => closeMiniMenuModal(false)}>
                  Main
                </Link>
              </div>
              <div className='menu' onClick={() => openQuizModal(true)}>
                Quiz
              </div>
            </>
          ) : (
            <>
              <div
                className='menu'
                onClick={() => openLoginOrSignupModal(true)}
              >
                Login
              </div>

              <div className='menu'>
                <Link to='/main' onClick={() => closeMiniMenuModal(false)}>
                  Main
                </Link>
              </div>
              <div className='menu' onClick={() => openQuizModal(true)}>
                Quiz
              </div>
            </>
          )}
        </div>
      </MiniMenuProfile>
    </MiniMenuWrap>
  );
}

export default MiniMenuModal;
