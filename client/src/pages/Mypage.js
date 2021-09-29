// 개인정보 확인 및 작성한 글 보이는 페이지
import UserInfo from '../components/UserInfo';
import UserContents from '../components/UserContents';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { setAccessToken, setUserInfo, setLogout, getContent } from '../actions';
import EditContent from '../modals/EditContent';
axios.defaults.withCredentials = true;

const MypageWrap = styled.div`
  width: 80%; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  /* background-color: rgba(255, 255, 255, 0.7); */
  margin: 0 auto;
  margin-top: 300px;
  border-radius: 20px;
`;

function Mypage() {
  const history = useHistory();
  const userInfoState = useSelector((state) => state.userInfoReducer);
  const userModalState = useSelector((state) => state.userModalReducer);
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  // /mypage로 들어가면 갖고있던 state로 userInfo 렌더해서 보여주기, userContent는 axios 요청하기(들어올때 한번만) + userContentReducer 업데이트

  const [editInfo, setEditInfo] = useState({
    userEditId: -1,
    userEditWordName: '',
    userEditWordMean: '',
  }); // edit모달에 보여질 유저가 작성한 내용 나타낼 state

  useEffect(() => {
    if (userInfoState.userInfo.id === -1) {
      history.push('/main');
      window.scrollTo(0, 0);
    } else {
      getMyInfo();
    }
  }, [userInfoState.userInfo.id, history]); // id가 변경될 때마다(=로그아웃) 다시 개인정보 요청

  useEffect(() => {
    if (userModalState.isShowEditContentModal === false) {
      getMyContent();
    }
  }, [userModalState.isShowEditContentModal]); // 모달 여부가 false일때만 user 유저가 쓴 글 요청 -> 맨 처음 + 한번 켜서 수정하고 돌아왔을때?

  const getMyContent = async () => {
    try {
      let contentResult = await axios.get(`${url}/meaning/me`, {
        headers: { authorization: `Bearer ${userInfoState.accessToken}` },
      });
      if (contentResult.data.accessToken) {
        dispatch(setAccessToken(contentResult.data.accessToken));
      } // contentResult에 accessToken이 담겨오면 새로 업데이트
      dispatch(getContent([...contentResult.data.data]));
    } catch (error) {
      if (error.response.data.message === 'Send new Login Request') {
        swal({
          title: '로그인이 필요합니다.',
          text: '로그인이 만료되었습니다.',
          icon: 'warning',
        }).then(() => {
          dispatch(setLogout());
          window.location.replace('/');
        });
      } else {
        swal({
          title: 'Internal Server Error',
          text: '죄송합니다. 다시 로그인해주세요.',
          icon: 'warning',
        }).then(() => {
          dispatch(setLogout());
          window.location.replace('/');
        });
      }
    }
  }; // axios로 유저가 쓴 글 요청 및 dispatch로 redux 업데이트

  const getMyInfo = async () => {
    try {
      let infoResult = await axios.get(`${url}/user`, {
        headers: { authorization: `Bearer ${userInfoState.accessToken}` },
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
        }).then(() => {
          dispatch(setLogout());
          window.location.replace('/');
        });
      } else {
        swal({
          title: 'Internal Server Error',
          text: '죄송합니다. 다시 로그인해주세요.',
          icon: 'warning',
        }).then(() => {
          dispatch(setLogout());
          window.location.replace('/');
        });
      }
    }
  }; // axios로 유저 정보 요청 및 dispatch로 redux 업데이트

  // 만약 내가 쓴 글 수정하는 isShowEditContentModal상태가 꺼진 상태라면 state 업데이트 + axios로 글 수정 요청
  // 만약 글을 삭제하면 state 업데이트 + axios로 글 없애기 요청

  return (
    <>
      {userModalState.isShowEditContentModal ? (
        <EditContent
          id={editInfo.userEditId}
          wordName={editInfo.userEditWordName}
          wordMean={editInfo.userEditWordMean}
        />
      ) : null}
      <MypageWrap>
        <UserInfo />
        <UserContents setEditInfo={setEditInfo} />
      </MypageWrap>
    </>
  );
}

export default Mypage;
