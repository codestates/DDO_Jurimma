import './App.css';
import axios from 'axios';
import Footer from './pages/Footer';
import Nav from './pages/Navbar';
import LandingPage from './pages/LandingPage';
import Main from './pages/Main';
import LoginOrSignUp from './modals/LoginOrSignUp';
import Mypage from './pages/Mypage';
import MypageEdit from './pages/EditMyPage';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Quiz from './modals/Quiz';

require('dotenv').config();
axios.defaults.withCredentials = true;

function App() {
  const state = useSelector((state) => state.userInfoReducer);
  const {
    userInfo,
    isLogin,
    isShowLoginOrSignupModal,
    isShowQuizModal,
    isShowSignoutModal,
    isShowLogoutModal,
    isShowChartModal,
  } = state;
  const dispatch = useDispatch();

  // const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  return (
    <BrowserRouter>
      <div className='App'>
        {isShowQuizModal ? <Quiz /> : null}
        {isShowLoginOrSignupModal ? <LoginOrSignUp /> : null}

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
