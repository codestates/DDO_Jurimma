// Navbar 부분
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLoginOrSignupModal,
  setQuizModal,
  setLogoutModal,
} from '../actions/index';

const NavBar = styled.nav`
  width: 100%;
  height: max(66.69px, 10vh);
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
`;

function Nav() {
  const state = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();

  const openQuizModal = (isOpen) => {
    dispatch(setQuizModal(isOpen));
  }; // 퀴즈 모달 여는 함수

  const openLoginOrSignupModal = (isOpen) => {
    dispatch(setLoginOrSignupModal(isOpen));
  }; // 로그인 모달 여는 함수

  const openLogoutModal = (isOpen) => {
    dispatch(setLogoutModal(isOpen));
  }; // 로그아웃 모달 여는 함수

  return (
    <NavBar>
      <div>
        <Link to='/'>Jurimma</Link>
      </div>
      <div>
        <Link to='/main'>Main</Link>
      </div>
      <div onClick={() => openQuizModal(true)}>Quiz</div>
      {state.isLogin ? (
        <div>
          <Link to='/mypage'>mypage</Link>
          <div onClick={() => openLogoutModal(true)}>Logout</div>
        </div>
      ) : (
        <div onClick={() => openLoginOrSignupModal(true)}>Login</div>
      )}
    </NavBar>
  );
}

export default Nav;
