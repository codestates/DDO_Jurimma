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

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from './actions/index';
import NewContent from './modals/NewContent';
import { useEffect } from 'react';

require('dotenv').config();
axios.defaults.withCredentials = true;

function App() {
  const state = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();
  // local 저장할땐 stringify를 해야한다 (뺄때는 parse)
  // useredit 이런거 할때 localStorage.removeItem('키') 써서 같이 수정하게 하고
  // 회원탈퇴 할때도 localStorage.clear() 해줘야함

  useEffect(() => {
    // console.log(JSON.parse(localStorage.userInfo).id);
    if (localStorage.userInfo) {
      dispatch(setLogin(true));
    } else {
      dispatch(setLogin(false));
    }
  }, []);

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
