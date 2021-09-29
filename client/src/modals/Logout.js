// 로그아웃 모달
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { setLogout, setLogoutModal } from '../actions/index';
import axios from 'axios';
import mainLogo from '../images/main_logo.svg';
axios.defaults.withCredentials = true;

const LogoutBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  place-items: center;
  z-index: 20;
`;
const LogoutModal = styled.div`
  width: max(30vw, 350px);
  height: 400px;
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
  > button {
    width: 50%;
    height: 50px;
    width: 200px;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 50px;
    background-color: #440a67;
    color: #fff;
    transition: 0.3s;
    font-size: max(0.85vw, 12px);
  }
  > button:hover {
    background-color: #b61919;
    color: #fff;
  }
  > #queLogout {
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: max(1.2vw, 16px);
  }
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-top: 85px;
  background: url(${mainLogo});
`;

function LogOut() {
  const userInfostate = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const closeLogoutModal = (isOpen) => {
    dispatch(setLogoutModal(isOpen));
  };

  const changeToLogout = () => {
    axios
      .get(`${url}/user/logout`, {
        headers: { authorization: `Bearer ${userInfostate.accessToken}}` },
      })
      .then(() => {
        swal({
          title: '로그아웃이 완료되었습니다.',
          text: '다음에 또 만나요! 🙋🏻 ',
          icon: 'success',
        }).then(() => {
          dispatch(setLogout());
          closeLogoutModal(false);
        });
      })
      .catch((err) => {
        swal({
          title: 'Internal Server Error',
          text: '죄송합니다. 다시 로그인해주세요.',
          icon: 'warning',
        }).then(() => {
          dispatch(setLogout());
          closeLogoutModal(false);
          window.location.replace('/');
        });
      });
  };

  return (
    <LogoutBackdrop>
      <LogoutModal>
        <div className='closeBtn' onClick={() => closeLogoutModal(false)}>
          &times;
        </div>
        <Logo></Logo>
        <div id='queLogout'>정말 로그아웃 하실 건가요?</div>
        <button onClick={changeToLogout}>로그아웃 하기</button>
      </LogoutModal>
    </LogoutBackdrop>
  );
}

export default LogOut;
