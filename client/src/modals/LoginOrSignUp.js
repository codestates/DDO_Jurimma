// 로그인 / 회원가입 모달
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginOrSignupModal } from '../actions/index';
import checkModule from '../checkModule';

const LoginOrSignupBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  z-index: 10;
`;
const LoginOrSignupModal = styled.article`
  width: max(340px, 50vw);
  max-width: 500px;
  height: max(420px, 50vh);
  height: 80vh;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  > .closeBtn {
    font-size: 3rem;
    color: #fff;
    position: absolute;
    right: -50px;
    top: -50px;
    cursor: pointer;
  }
`;
const OauthLogin = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  height: 10vh;
`;
const KakaoLogin = styled.button`
  display: block;
  height: 5vh;
  border: 1px solid red;
`;
const GoogleLogin = styled.button`
  border: 1px solid red;
  height: 5vh;
  display: block;
`;
const TabWrap = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  border: 1px solid red;
`;
const TabMenu = styled.ul`
  border: 1px solid red;
  height: 5vh;
  display: flex;
  > li {
    flex: 1 1 auto;
    text-align: center;
    cursor: pointer;
  }
  > .focused {
    background: purple;
  }
`;
const TabContent = styled.div`
  border: 1px solid red;
  height: 65vh;
  > input {
    display: block;
    width: 100%;
    height: 30px;
    border: 1px solid black;
  }
`;

function LoginOrSignUp() {
  const dispatch = useDispatch();
  const closeLoginOrSignupModal = (isOpen) => {
    dispatch(setLoginOrSignupModal(isOpen));
  }; // 로그인 모달 닫는 함수
  const [loginInfo, setLoginInfo] = useState({
    loginEmail: '',
    loginPassword: '',
  }); // 로그인창 입력 상태

  const [signupInfo, setSignupInfo] = useState({
    signupUsername: '',
    signupEmail: '',
    signupPhone: '',
    signupPassword: '',
    signupRePassword: '',
  }); // 회원가입창 입력 상태

  const handleKeyPressLogin = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      handleLogin();
    }
  }; // 로그인 창에서 엔터나 버튼 클릭했을때

  const handleKeyPressSignup = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      handleSignup();
    }
  }; // 회원가입 창에서 엔터나 버튼 클릭했을때

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  }; // 로그인 창에서 input에 입력했을 때 입력값 받아오기

  const handleSignupInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  }; // 회원가입 창에서 input에 입력했을 때 입력값 받아오기

  const handleLogin = async () => {
    try {
      if (!loginInfo.loginEmail || !loginInfo.loginPassword) {
        alert('이메일과 비밀번호 모두 입력해주세요.');
      } else if (checkModule.IsValidateEmail(loginInfo.loginEmail) === false) {
        alert('유효하지 않은 이메일 입니다.');
      } else if (
        checkModule.IsValidatePassword(loginInfo.loginPassword) === false
      ) {
        alert('유효하지 않은 비밀번호 입니다.');
      } else {
        // axios 요청 전송
        closeLoginOrSignupModal(false); // 모달 끄기
      }
    } catch (error) {
      console.log(error);
      alert('로그인 정보가 없습니다.');
    }
  };

  const handleSignup = async () => {
    try {
      if (
        !signupInfo.signupUsername ||
        !signupInfo.signupEmail ||
        !signupInfo.signupPhone ||
        !signupInfo.signupPassword ||
        !signupInfo.signupRePassword
      ) {
        alert('정보를 모두 입력해주세요.');
      } else if (signupInfo.signupPassword !== signupInfo.signupRePassword) {
        alert('비밀번호를 확인해주세요.');
      } else if (
        checkModule.IsValidateEmail(signupInfo.signupEmail) === false
      ) {
        alert('유효하지 않은 이메일 입니다.');
      } else if (
        checkModule.IsValidatePassword(signupInfo.signupPassword) === false
      ) {
        alert('유효하지 않은 비밀번호 입니다.');
      } else if (checkModule.OnlyNumber(signupInfo.signupPhone) === false) {
        alert('유효하지 않은 핸드폰 번호입니다.');
      } else if (checkModule.OnlyKorEng(signupInfo.signupUsername) === false) {
        alert('유효하지 않은 이름입니다.');
      } else {
        // axios 요청 전송
        closeLoginOrSignupModal(false); // 모달 끄기
      }
    } catch (error) {
      console.log(error);
      alert('이미 가입된 사용자입니다.');
    }
  };

  const [currentTab, setCurrentTab] = useState(0);
  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };
  return (
    <LoginOrSignupBackdrop>
      <LoginOrSignupModal>
        <div
          className='closeBtn'
          onClick={() => closeLoginOrSignupModal(false)}
        >
          &times;
        </div>
        <OauthLogin>
          <KakaoLogin>카카오 로그인</KakaoLogin>
          <GoogleLogin>구글 로그인</GoogleLogin>
        </OauthLogin>

        <TabWrap>
          <TabMenu>
            <li
              className={currentTab === 0 ? 'submenu focused' : 'submenu'}
              onClick={() => selectMenuHandler(0)}
            >
              로그인
            </li>
            <li
              className={currentTab === 1 ? 'submenu focused' : 'submenu'}
              onClick={() => selectMenuHandler(1)}
            >
              회원가입
            </li>
          </TabMenu>
          <TabContent>
            {currentTab === 0 ? (
              <>
                <input
                  className='email'
                  type='text'
                  placeholder='이메일'
                  onChange={handleInputValue('loginEmail')}
                  onKeyPress={handleKeyPressLogin}
                  value={loginInfo.loginEmail}
                />
                <input
                  className='password'
                  type='password'
                  placeholder='비밀번호'
                  value={loginInfo.loginPassword}
                  onKeyPress={handleKeyPressLogin}
                  onChange={handleInputValue('loginPassword')}
                />
                <button onClick={handleLogin}>로그인 하기</button>
              </>
            ) : (
              <>
                <input
                  id='user'
                  type='text'
                  placeholder='사용자 이름 (한글과 영문만 가능)'
                  value={signupInfo.signupUsername}
                  onChange={handleSignupInputValue('signupUsername')}
                  onKeyPress={handleKeyPressSignup}
                />
                <input
                  className='email'
                  type='text'
                  placeholder='이메일'
                  value={signupInfo.signupEmail}
                  onChange={handleSignupInputValue('signupEmail')}
                  onKeyPress={handleKeyPressSignup}
                />
                <input
                  className='password'
                  type='password'
                  placeholder='비밀번호 (최소 8자이상, 대문자, 특수문자 포함)'
                  value={signupInfo.signupPassword}
                  onChange={handleSignupInputValue('signupPassword')}
                  onKeyPress={handleKeyPressSignup}
                />
                <input
                  className='password'
                  type='password'
                  placeholder='비밀번호 확인'
                  value={signupInfo.signupRePassword}
                  onChange={handleSignupInputValue('signupRePassword')}
                  onKeyPress={handleKeyPressSignup}
                />
                <button onClick={handleSignup}>가입하기</button>
              </>
            )}
          </TabContent>
        </TabWrap>
      </LoginOrSignupModal>
    </LoginOrSignupBackdrop>
  );
}

export default LoginOrSignUp;
