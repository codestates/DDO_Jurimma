// Navbar 부분
import styled, { keyframes } from 'styled-components';
import mainLogo from '../images/main_logo.svg';
import whiteLogo from '../images/main_logoWhite.svg';
import '../App.css';
import swal from 'sweetalert';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLoginOrSignupModal,
  setQuizModal,
  setLogoutModal,
  setMiniMenuModal,
} from '../actions/index';
import silverProfile from '../images/junior_profile.svg';
import goldProfile from '../images/senior_profile.svg';
import diaProfile from '../images/master_profile.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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
  @media only screen and (max-width: 800px) {
    display: none;
  }
  > .logo {
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
  @media only screen and (max-width: 800px) {
    display: none;
  }
  > .logo {
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

const Myprofile = styled.div`
  width: max(8vw, 120px);
  height: 200px;
  margin-top: 105px;
  cursor: pointer;
  :hover {
    > .HoverMypageOrLogout {
      display: block;
    }
  }
  > .levelProfile {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    > div {
      width: 35px;
      height: 35px;
      margin: 0 auto;
      position: relative;
      top: 35px;
      border-radius: 50px;
    }
  }
`;

const HoverMypageOrLogout = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  width: max(8vw, 120px);
  height: 90px;
  position: relative;
  top: 10px;
  text-align: center;
  line-height: 42.5px;
  border-radius: 20px;
  color: #440a67;
  font-family: 'NEXON Lv2 Gothic Bold';
  display: none;
  > a {
    display: block;
    height: 45px;
    text-decoration: none;
    border-bottom: 1px solid #440a67;
    :hover {
      background-color: #230638;
      border-radius: 20px 20px 0 0;
      color: #fff;
    }
  }
  > .logout {
    cursor: pointer;
    height: 45px;
    text-decoration: none;
    border-top: 1px solid #440a67;
    color: #440a67;
    font-family: 'NEXON Lv2 Gothic Bold';
    :hover {
      background-color: #230638;
      border-radius: 0 0 20px 20px;
      color: #fff;
    }
  }
`;

const MiniNav2 = styled.div`
  width: 100%;
  height: 85px;
  background-color: #fff;
  position: fixed;
  display: flex;
  align-items: center;
  opacity: 0;
  @media only screen and (max-width: 800px) {
    opacity: 1;
  }
  > .logo {
    flex: 1 1 auto;
    margin-top: 5px;
    > a {
      display: block;
      width: 70px;
      height: 70px;
      margin-left: 10px;
      background: url(${mainLogo});
    }
  }
  > #hambuger {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    cursor: pointer;
    > .bars {
      width: 40px;
      height: 40px;
      color: #440a67;
    }
  }
`;

const MiniNav1 = styled.div`
  width: 100%;
  height: 85px;
  position: fixed;
  display: flex;
  align-items: center;
  opacity: 0;
  @media only screen and (max-width: 800px) {
    opacity: 1;
  }
  > .logo {
    flex: 1 1 auto;
    margin-top: 5px;
    > a {
      display: block;
      width: 70px;
      height: 70px;
      margin-left: 10px;
      background: url(${whiteLogo});
    }
  }
  > #hambuger {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    > .bars {
      width: 40px;
      height: 40px;
      color: #fff;
    }
  }
`;

function Nav() {
  const state = useSelector((state) => state.userInfoReducer);
  const nowDate = new Date().toLocaleDateString(); // 접속한 날짜를 "2021. 9. 13."와 같은 형식으로 확인
  const dispatch = useDispatch();
  const [navBarScroll, setNavBarScroll] = useState(false); // nav bar 스크롤 했을 때

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
    }
  }; // 퀴즈 모달 여는 함수

  const openLoginOrSignupModal = (isOpen) => {
    dispatch(setLoginOrSignupModal(isOpen));
  }; // 로그인 모달 여는 함수

  const openLogoutModal = (isOpen) => {
    dispatch(setLogoutModal(isOpen));
  }; // 로그아웃 모달 여는 함수

  const openMiniMenuModal = (isOpen) => {
    dispatch(setMiniMenuModal(isOpen));
  }; // 햄버거 바 클릭했을 때 열리는 모달 함수

  const scrollNavChange = () => {
    if (window.scrollY >= 20) {
      setNavBarScroll(true);
    } else {
      setNavBarScroll(false);
    }
  }; // 지정된 스크롤에 닿았을 때 nav bar 변경

  // const clearTimer = (timer) => {
  //   // console.log('멈춰!');
  //   clearInterval(timer);
  // };
  // const workTimer = () => {
  //   console.log('들어옴!');
  //   timer = setInterval(function () {
  //     console.log('작동중!');
  //   }, 3000);
  //   console.log('작동함!');
  // };
  window.addEventListener('scroll', scrollNavChange);

  return (
    <>
      {navBarScroll ? (
        <MiniNav2>
          <div className='navInner logo'>
            <Link to='/'></Link>
          </div>

          <div id='hambuger' onClick={() => openMiniMenuModal(true)}>
            <FontAwesomeIcon className='bars' icon={faBars} />
          </div>
        </MiniNav2>
      ) : (
        <MiniNav1>
          <div className='navInner logo'>
            <Link to='/'></Link>
          </div>

          <div id='hambuger' onClick={() => openMiniMenuModal(true)}>
            <FontAwesomeIcon className='bars' icon={faBars} />
          </div>
        </MiniNav1>
      )}
      {navBarScroll ? (
        <NavBar2>
          <div className='navInner logo'>
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
              <Myprofile>
                <div
                  className='levelProfile'
                  style={{
                    background: `url(${whatProfile})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div
                    style={{
                      background: `url(${state.userInfo.userPic})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                </div>
                <HoverMypageOrLogout className='HoverMypageOrLogout'>
                  <Link to='/mypage'>Mypage</Link>
                  <div className='logout' onClick={() => openLogoutModal(true)}>
                    Logout
                  </div>
                </HoverMypageOrLogout>
              </Myprofile>
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
          <div className='navInner logo'>
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
              <Myprofile>
                <div
                  className='levelProfile'
                  style={{
                    background: `url(${whatProfile})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div
                    style={{
                      background: `url(${state.userInfo.userPic})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                </div>
                <HoverMypageOrLogout className='HoverMypageOrLogout'>
                  <Link to='/mypage'>Mypage</Link>
                  <div className='logout' onClick={() => openLogoutModal(true)}>
                    Logout
                  </div>
                </HoverMypageOrLogout>
              </Myprofile>
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
