import './App.css';
import axios from 'axios';
import Footer from './pages/Footer';
import Nav from './pages/Navbar';
import LandingPage from './pages/LandingPage';
import Main from './pages/Main';
import LoginOrSignUp from './modals/LoginOrSignUp';
import Mypage from './pages/Mypage';
import MypageEdit from './pages/EditMyPage';
import SearchMore from './pages/SearchMore';
import ChartModal from './modals/ChartModal';
import Quiz from './modals/Quiz';
import EditContent from './modals/EditContent';
import Logout from './modals/Logout';
import SignOut from './modals/SignOut';
import swal from 'sweetalert';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setAccessToken, setUserInfo } from './actions/index';
import NewContent from './modals/NewContent';
import { useEffect } from 'react';

require('dotenv').config();
axios.defaults.withCredentials = true;

function App() {
  const state = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();
  console.log(state);

  useEffect(() => {
    // console.log(JSON.parse(localStorage.userInfo).id);
    if (localStorage.userInfo) {
      dispatch(setLogin(true));
      dispatch(setUserInfo(JSON.parse(localStorage.userInfo)));
      // setUserInfo를 하지 않으면 로그인 후에 퀴즈를 풀어도 다시 풀 수 있게 된다.
    } else {
      dispatch(setLogin(false));
    }

    const authorizationCode = new URL(window.location.href).searchParams.get(
      'code'
    );
    if (authorizationCode) {
      console.log(authorizationCode);
      getUserInfoAndAccessToken(authorizationCode);
    }
  }, []);

  const getUserInfoAndAccessToken = (authorizationCode) => {
    const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
    const payload = { authorizationCode };
    const socialType = localStorage.getItem('socialType');

    axios
      .post(`${url}/user/${socialType}`, payload)
      .then((res) => {
        console.log(res.data);
        dispatch(setLogin(true)); // axios응답으로 redux 업데이트
        dispatch(setAccessToken(res.data.accessToken)); // axios 응답으로 accessToken 업데이트
        dispatch(setUserInfo(res.data.userInfo)); // axios응답으로 userInfo 업데이트
        // console.log(state.userInfo); // 유저 정보 콘솔에 찍어보기
        localStorage.removeItem('socialType');
        swal({
          title: '로그인이 완료되었습니다!',
          text: '만반잘부 😆 (만나서 반갑고 잘 부탁해)!',
          icon: 'success',
        }).then(() => {
          window.location.replace('/');
        });
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: '로그인에 실패하였습니다',
          text: '다시 로그인 해주세요!',
          icon: 'warning',
        }); // swal로 안내
      });
  };

  const {
    isShowLoginOrSignupModal,
    isShowQuizModal,
    isShowChartModal,
    isShowNewContentModal,
    isShowEditContentModal,
    isShowLogoutModal,
    isShowSignoutModal,
    isLogin,
    userInfo,
  } = state;

  // const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  return (
    <BrowserRouter>
      <div className='App'>
        {isShowQuizModal ? <Quiz /> : null}
        {isShowLoginOrSignupModal ? <LoginOrSignUp /> : null}
        {isShowChartModal ? <ChartModal /> : null}
        {isShowNewContentModal ? <NewContent /> : null}
        {isShowEditContentModal ? <EditContent /> : null}
        {isShowLogoutModal ? <Logout /> : null}
        {isShowSignoutModal ? <SignOut /> : null}
        <header>
          <Switch>
            <Nav />
          </Switch>
        </header>

        <section className='mainContent'>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/main'>
            <Main />
          </Route>
          <Route path='/searchMore'>
            <SearchMore />
          </Route>
          <Route path='/mypage'>
            <Mypage />
          </Route>
          <Route path='/mypageEdit'>
            <MypageEdit />
          </Route>
        </section>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
