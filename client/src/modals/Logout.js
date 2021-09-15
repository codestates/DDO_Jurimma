// 로그아웃 모달
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { setLogout, setLogoutModal } from '../actions/index';
import axios from 'axios';
import { useEffect } from 'react';
import { setLogin } from '../actions/index';
axios.defaults.withCredentials = true;

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
  const state = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const closeLogoutModal = (isOpen) => {
    dispatch(setLogoutModal(isOpen));
  }; // 로그인 모달 닫는 함수

  const changeToLogout = () => {
    axios
      .get(`${url}/user/logout`, {
        headers: { authorization: `Bearer ${state.accessToken}}` },
      })
      .then(() => {
        dispatch(setLogout()); // reducer 로그아웃으로 상태 업데이트
        swal({
          title: '로그아웃 되었습니다',
          text: '다또봐 👋 (다음에 또 봐~)',
          icon: 'success',
        });
        console.log(state);
      })
      .catch((err) => {
        console.log(err);
      });
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
