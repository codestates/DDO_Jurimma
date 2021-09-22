// 유저의 개인정보 및 모달 닫/열림 상태 관리 reducer
// 기본값: 개인 정보 (username, email, userPic, exp), 로그인 상태, 모달 상태(로그인, 로그아웃, …)
// 기능 : 로그인하기, 유저 이름/비밀번호/사진 변경, 모달 켜기/끄기, 로그아웃하기, 회원 탈퇴하기

import {
  SET_LOGIN_STATE,
  SET_LOGOUT_STATE,
  SET_ACCESS_TOKEN,
  SET_USER_INFO,
} from '../actions/index';

const defaultUserInfo = {
  userInfo: {
    id: -1,
    email: '',
    username: '',
    userPic: null,
    experience: 0,
    quizDate: null, // 퀴즈 모달에 접속한 날짜
  }, // 기본 유저 정보
  isLogin: false, //로그인 상태
  accessToken: null,
};

const userInfoReducer = (state = defaultUserInfo, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE: // 로그인 reducer
      return {
        ...state,
        isLogin: action.isLogin,
      };

    case SET_LOGOUT_STATE: // 로그아웃 reducer
      return { ...defaultUserInfo };

    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };

    case SET_USER_INFO:
      // console.log(action.userInfo);
      return {
        ...state,
        userInfo: action.userInfo,
      };

    default:
      // 기본 reducer
      return state;
  }
};

export default userInfoReducer;
