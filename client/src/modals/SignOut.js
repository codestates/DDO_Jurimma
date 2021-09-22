// 회원 탈퇴 모달
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setSignOutModal, setLogout } from '../actions/index';
import { useHistory } from 'react-router-dom';
import mainLogo from '../images/main_logo.svg';
import swal from 'sweetalert';
import axios from 'axios';
axios.defaults.withCredentials = true;

const SignoutBackdrop = styled.div`
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

const SignoutModal = styled.div`
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
  > #queSignout {
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

const ButtonWrap = styled.div`
  width: 80%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  > button {
    height: 50px;
    width: 200px;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 50px;
    background-color: #440a67;
    color: #fff;
    margin-left: 10px;
    transition: 0.3s;
    font-size: max(0.85vw, 12px);
  }
  > button:nth-child(1) {
    margin-left: 0;
  }
  > button:hover {
    background-color: #b61919;
    color: #fff;
  }
`;

function Signout() {
  const state = useSelector((state) => state.userInfoReducer);
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const dispatch = useDispatch();
  const history = useHistory();
  const closeEditContentModal = (isOpen) => {
    dispatch(setSignOutModal(isOpen));
  }; // 로그인 모달 닫는 함수

  const handleSignOut = () => {
    axios
      .delete(`${url}/user`, {
        headers: { authorization: `Bearer ${state.accessToken}}` },
      })
      .then(() => {
        dispatch(setLogout());
        swal({
          title: '회원탈퇴가 완료되었습니다.',
          text: '슬빠... 😢 (슬프지만 빠이..ㅠ)',
          icon: 'success',
        });
        closeEditContentModal(false);
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message === 'Forbidden Request') {
          swal({
            title: '회원탈퇴가 실패하였습니다.',
            text: '죄송합니다😞 회원가입 후 24시간 뒤에 탈퇴가 가능합니다.',
            icon: 'warning',
          });
          dispatch(setSignOutModal(false));
        } else {
          swal({
            title: 'Internal Server Error',
            text: '죄송합니다. 다시 로그인 후 해주세요.',
            icon: 'warning',
          }); // swal로 안내
          dispatch(setLogout());
        }
      });
  };

  return (
    <SignoutBackdrop>
      <SignoutModal>
        <div className='closeBtn' onClick={() => closeEditContentModal(false)}>
          &times;
        </div>
        <Logo></Logo>
        <div id='queSignout'>정말 회원탈퇴 하실 건가요?</div>
        <ButtonWrap>
          <button onClick={handleSignOut}>탈퇴하기</button>
          <button onClick={() => closeEditContentModal(false)}>취소하기</button>
        </ButtonWrap>
      </SignoutModal>
    </SignoutBackdrop>
  );
}

export default Signout;
