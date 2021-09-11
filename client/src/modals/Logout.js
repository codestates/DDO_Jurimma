// 로그아웃 모달
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setLogout, setLogoutModal } from '../actions/index';

const LogoutBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  display: grid;
  place-items: center;
`;
const LogoutModal = styled.div`
  width: 50vw;
  height: 80vh;
  background-color: #fff;
`;

function Logout() {
  const dispatch = useDispatch();
  const closeLogoutModal = (isOpen) => {
    dispatch(setLogoutModal(isOpen));
  }; // 로그인 모달 닫는 함수

  const changeToLogout = () => {
    dispatch(setLogout());
  };

  return (
    <LogoutBackdrop>
      <LogoutModal>
        <div onClick={() => closeLogoutModal(false)}>&times;</div>
        this is Logout Modal
        <button onClick={changeToLogout}>로그아웃하기</button>
      </LogoutModal>
    </LogoutBackdrop>
  );
}

export default Logout;
