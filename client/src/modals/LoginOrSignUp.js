// 로그인 / 회원가입 모달
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginOrSignupModal } from '../actions/index';
import checkModule from '../checkModule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
library.add(fab, faComment);

const LoginOrSignupBackdrop = styled.div`
  /* width: 100vw;
  height: 100vh; */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: fixed;
`;

const LoginOrSignupModal = styled.article`
  width: max(30vw, 350px);
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
`;
const OauthLogin = styled.div`
  width: 100%;
  height: 150px;
  > p {
    text-align: center;
    height: 30px;
    margin-top: 10px;
    line-height: max(2vh, 40px);
  }
  > .OauthLoginBtn {
    display: flex;
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    height: max(3vh, 50px);
    justify-content: space-evenly;
  }
`;
const KakaoLogin = styled.button`
  border-radius: 40px;
  width: 40%;
  background-color: #fee500;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background-color: #000;
    color: #fff;
  }
`;
const GoogleLogin = styled.button`
  width: 40%;
  border-radius: 40px;
  background-color: #ddd;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background-color: #000;
    color: #fff;
  }
`;

const TabWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TabMenu = styled.ul`
  height: max(50px, 5vh);
  display: flex;
  > li {
    width: 50%;
    text-align: center;
    cursor: pointer;
    line-height: max(50px, 5vh);
  }
  > .focused {
    background-color: #440a67;
    color: #fff;
  }
`;
const TabContent = styled.div`
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #440a67;
  border-radius: 0 0 20px 20px;
  > .tabContentWrap {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    > form {
      display: flex;
      flex-direction: column;
      > input {
        display: block;
        width: 70%;
        height: max(50px, 5vh);
        border-bottom: 2px solid #fff;
        margin: 0 auto;
        margin-top: 10px;
        outline: 0;
        background-color: transparent;
        color: #ffffff;
      }
      > input::-webkit-input-placeholder {
        font-size: 11px;
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
    }
    > button {
      display: block;
      margin: 0 auto;
      width: 50%;
      height: 50px;
      cursor: pointer;
      border-radius: 40px;
      border: 2px solid #fff;
      color: #fff;
      background-color: transparent;
      transition: all 0.3s;
    }
    > button:hover {
      background-color: #fff;
      color: #440a67;
    }
  }
`;

const ErrorMsg = styled.div`
  width: 300px;
  height: 20px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  color: red;
  text-align: center;
  line-height: 30px;
  font-size: max(0.8vw, 10px);
  /* display: none; */
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

  const [errorMsg, setErrorMsg] = useState('');

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
        setErrorMsg('이메일과 비밀번호 모두 입력해주세요.');
      } else if (checkModule.IsValidateEmail(loginInfo.loginEmail) === false) {
        setErrorMsg('유효하지 않은 이메일 입니다.');
      } else if (
        checkModule.IsValidatePassword(loginInfo.loginPassword) === false
      ) {
        setErrorMsg('유효하지 않은 비밀번호 입니다.');
      } else {
        setErrorMsg('');
        // axios 요청 전송
        swal({
          title: '로그인이 완료되었습니다!',
          text: '만반잘부(만나서 반갑고 잘 부탁해)!',
          icon: 'success',
        });
        closeLoginOrSignupModal(false); // 모달 끄기
      }
    } catch (error) {
      console.log(error);
      setErrorMsg('로그인 정보가 없습니다.');
    }
  };

  const handleSignup = async () => {
    try {
      if (
        !signupInfo.signupUsername ||
        !signupInfo.signupEmail ||
        !signupInfo.signupPassword ||
        !signupInfo.signupRePassword
      ) {
        setErrorMsg('정보를 모두 입력해주세요.');
      } else if (signupInfo.signupPassword !== signupInfo.signupRePassword) {
        setErrorMsg('비밀번호를 확인해주세요.');
      } else if (
        checkModule.IsValidateEmail(signupInfo.signupEmail) === false
      ) {
        setErrorMsg('유효하지 않은 이메일 입니다.');
      } else if (
        checkModule.IsValidatePassword(signupInfo.signupPassword) === false
      ) {
        setErrorMsg('유효하지 않은 비밀번호 입니다.');
      } else if (checkModule.OnlyKorEng(signupInfo.signupUsername) === false) {
        setErrorMsg('유효하지 않은 이름입니다.');
      } else {
        // axios 요청 전송
        setErrorMsg('');
        swal({
          title: '가입이 완료 되었습니다!',
          text: '2분 이내에 이메일 인증을 하지 않을시 회원가입이 취소됩니다.',
          icon: 'success',
        });
        closeLoginOrSignupModal(false); // 모달 끄기
      }
    } catch (error) {
      console.log(error);
      setErrorMsg('이미 가입된 사용자입니다.');
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
          <p>카카오와 구글 계정으로 로그인해보세요!</p>
          <div className='OauthLoginBtn'>
            <KakaoLogin>
              <FontAwesomeIcon icon={faComment} />
              카카오 로그인
            </KakaoLogin>

            <GoogleLogin>
              <FontAwesomeIcon icon={['fab', 'google']} />
              구글 로그인
            </GoogleLogin>
          </div>
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
              <div className='tabContentWrap'>
                <form>
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
                </form>
                <ErrorMsg>{errorMsg}</ErrorMsg>
                <button onClick={handleLogin}>로그인 하기</button>
              </div>
            ) : (
              <div className='tabContentWrap'>
                <form>
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
                </form>

                <ErrorMsg>{errorMsg}</ErrorMsg>
                <button onClick={handleSignup}>가입하기</button>
              </div>
            )}
          </TabContent>
        </TabWrap>
      </LoginOrSignupModal>
    </LoginOrSignupBackdrop>
  );
}

export default LoginOrSignUp;
