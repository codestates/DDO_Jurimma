// 로그인 / 회원가입 모달
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setLoginOrSignupModal } from '../actions/index';

const LoginOrSignupBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  display: grid;
  place-items: center;
`;
const LoginOrSignupModal = styled.div`
  width: 50vw;
  height: 80vh;
  background-color: #fff;
`;

function LoginOrSignUp() {
  const dispatch = useDispatch();
  const closeLoginOrSignupModal = (isOpen) => {
    dispatch(setLoginOrSignupModal(isOpen));
  }; // 로그인 모달 닫는 함수

  return (
    <LoginOrSignupBackdrop>
      <LoginOrSignupModal>
        <div onClick={() => closeLoginOrSignupModal(false)}>&times;</div>
        this is LoginOrSignupModal
      </LoginOrSignupModal>
    </LoginOrSignupBackdrop>
  );
}

export default LoginOrSignUp;
