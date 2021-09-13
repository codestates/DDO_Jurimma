// Navbar 부분
import styled, { keyframes } from 'styled-components';
import mainLogo from '../images/main_logo.svg';
import whiteLogo from '../images/main_logoWhite.svg';
import '../App.css';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLoginOrSignupModal,
  setQuizModal,
  setLogoutModal,
} from '../actions/index';

const fadeIn = keyframes`
  0%{opacity : 0}
  100%{opacity : 1}
`;

const fadeout = keyframes`
  0%{opacity : 0}
  100%{opacity : 1}
`;

const NavBar1 = styled.nav`
  width: 100%;
  height: 85px;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  animation: ${fadeout} 0.5s;
  > #logo {
    flex: 1 1 auto;
    margin-top: 5px;
    > a {
      display: block;
      width: 80px;
      height: 80px;
      margin-left: 20px;
      background: url(${whiteLogo});
    }
  }
  > #menu_container {
    display: flex;
    flex: 6 1 auto;
    justify-content: flex-end;
    margin-right: 20px;
    align-items: center;
    > .menu {
      width: max(8vw, 100px);
      height: 50px;
      border-radius: 50px;
      line-height: 50px;
      text-align: center;
      margin-left: max(1vw, 10px);
      font-size: max(1.2vw, 18px);
      font-family: 'NEXON Lv2 Gothic Bold';
      color: #fff; // login, quiz 부분
      transition: 0.5s;
      > a {
        width: max(8vw, 100px);
        height: 50px;
        display: block;
        border-radius: 50px;
        text-decoration-line: none;
        color: #fff; // main 부분
      }
      > a:hover {
        color: #440a67;
      }
    }
    > .menu:hover {
      background-color: #fff;
      color: #440a67;
      cursor: pointer;
    }
  }
`;

const NavBar2 = styled.nav`
  width: 100%;
  height: 85px;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  background-color: #fff;
  transition: 0.3s;
  z-index: 5;
  animation: ${fadeIn} 0.8s;
  > #logo {
    flex: 1 1 auto;
    margin-top: 5px;
    > a {
      display: block;
      width: 80px;
      height: 80px;
      margin-left: 20px;
      background: url(${mainLogo});
    }
  }
  > #menu_container {
    display: flex;
    flex: 6 1 auto;
    justify-content: flex-end;
    margin-right: 20px;
    align-items: center;
    > .menu {
      width: max(8vw, 100px);
      height: 50px;
      border-radius: 50px;
      line-height: 50px;
      text-align: center;
      margin-left: max(1vw, 10px);
      font-size: max(1.2vw, 18px);
      font-family: 'NEXON Lv2 Gothic Bold';
      color: #440a67; // login, quiz 부분
      transition: 0.5s;
      > a {
        width: max(8vw, 100px);
        height: 50px;
        display: block;
        border-radius: 50px;
        text-decoration-line: none;
        color: #440a67; // main 부분
      }
      > a:hover {
        color: #fff;
      }
    }
    > .menu:hover {
      background-color: #440a67;
      color: #fff;
      cursor: pointer;
    }
  }
`;

function Nav() {
  const state = useSelector((state) => state.userInfoReducer);
  const nowDate = new Date().toLocaleDateString(); // 접속한 날짜를 "2021. 9. 13."와 같은 형식으로 확인
  const dispatch = useDispatch();
  const [navBarScroll, setNavBarScroll] = useState(false); // nav bar 스크롤 했을 때

  const openQuizModal = (isOpen) => {
    if (nowDate !== state.userInfo.quizDate && state.isLogin) {
      // 로그인 되어있고 최근 퀴즈를 푼 날짜가 오늘 날짜와 다를때만 실행
      dispatch(setQuizModal(isOpen));
    } else if (state.isLogin === false) {
      alert('로그인이 필요합니다.');
    } else {
      alert('이미 퀴즈를 진행하였습니다.');
    }
  }; // 퀴즈 모달 여는 함수

  const openLoginOrSignupModal = (isOpen) => {
    dispatch(setLoginOrSignupModal(isOpen));
  }; // 로그인 모달 여는 함수

  const openLogoutModal = (isOpen) => {
    dispatch(setLogoutModal(isOpen));
  }; // 로그아웃 모달 여는 함수

  const scrollNavChange = () => {
    if (window.scrollY >= 200) {
      setNavBarScroll(true);
    } else {
      setNavBarScroll(false);
    }
  }; // 지정된 스크롤에 닿았을 때 nav bar 변경

  window.addEventListener('scroll', scrollNavChange);

  return (
    <>
      {navBarScroll ? (
        <NavBar2>
          <div id='logo' className='navInner'>
            <Link to='/'></Link>
          </div>
          <div id='menu_container' className='navInner'>
            <div className='menu'>
              <Link to='/main'>Main</Link>
            </div>
            <div className='menu' onClick={() => openQuizModal(true)}>
              Quiz
            </div>
            {state.isLogin ? (
              <div>
                <Link to='/mypage'>mypage</Link>
                <div className='menu' onClick={() => openLogoutModal(true)}>
                  Logout
                </div>
              </div>
            ) : (
              <div
                className='menu'
                onClick={() => openLoginOrSignupModal(true)}
              >
                Login
              </div>
            )}
          </div>
        </NavBar2>
      ) : (
        <NavBar1>
          <div id='logo' className='navInner'>
            <Link to='/'></Link>
          </div>
          <div id='menu_container' className='navInner'>
            <div className='menu'>
              <Link to='/main'>Main</Link>
            </div>
            <div className='menu' onClick={() => openQuizModal(true)}>
              Quiz
            </div>
            {state.isLogin ? (
              <div>
                <Link to='/mypage'>mypage</Link>
                <div className='menu' onClick={() => openLogoutModal(true)}>
                  Logout
                </div>
              </div>
            ) : (
              <div
                className='menu'
                onClick={() => openLoginOrSignupModal(true)}
              >
                Login
              </div>
            )}
          </div>
        </NavBar1>
      )}
    </>
  );
}

export default Nav;
