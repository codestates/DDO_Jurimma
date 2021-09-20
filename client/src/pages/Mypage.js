// 개인정보 확인 및 작성한 글 보이는 페이지
import UserInfo from '../components/UserInfo';
import UserContents from '../components/UserContents';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { setAccessToken, setUserInfo, setLogout } from '../actions';
axios.defaults.withCredentials = true;

const MypageWrap = styled.div`
  width: 80%; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  /* background-color: rgba(255, 255, 255, 0.7); */
  margin: 0 auto;
  margin-top: 300px;
  border-radius: 20px;
`;

function Mypage() {
  const state = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  // /mypage로 들어가면 갖고있던 state로 userInfo 렌더해서 보여주기, userContent는 axios 요청하기(들어올때 한번만) + userContentReducer 업데이트

  const getMyInfo = async () => {
    try {
      let infoResult = await axios.get(`${url}/user`, {
        headers: { authorization: `Bearer ${state.accessToken}` },
      }); // userinfo 받아오기
      if (infoResult.data.accessToken) {
        dispatch(setAccessToken(infoResult.data.accessToken));
      }
      dispatch(setUserInfo(infoResult.data.data));
    } catch (error) {
      if (error.response.data.message === 'Send new Login Request') {
        swal({
          title: '로그인이 필요합니다.',
          text: '로그인이 만료되었습니다.',
          icon: 'warning',
        }); // swal로 안내
        dispatch(setLogout());
      } else {
        swal({
          title: 'Internal Server Error',
          text: '죄송합니다. 다시 로그인해주세요.',
          icon: 'warning',
        }); // swal로 안내
        dispatch(setLogout());
      }
    }
  }; // axios로 유저 정보 요청 및 dispatch로 redux 업데이트

  useEffect(() => {
    getMyInfo();
  }, []); // 렌더링 될때마다 다시 개인정보 요청
  return (
    <>
      {state.isLogin ? (
        <MypageWrap>
          <UserInfo />
          <UserContents />
        </MypageWrap>
      ) : (
        <Redirect to='/main' /> // 로그인상태 X라면 메인페이지로 되돌아감
      )}
    </>
  );
}

export default Mypage;
