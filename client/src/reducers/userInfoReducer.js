// 유저의 개인정보 및 모달 닫/열림 상태 관리 reducer
// 기본값: 개인 정보 (username, email, userPic, exp), 로그인 상태, 모달 상태(로그인, 로그아웃, …)
// 기능 : 로그인하기, 유저 이름/비밀번호/사진 변경, 모달 켜기/끄기, 로그아웃하기, 회원 탈퇴하기

import {
  SET_MODAL_QUIZ,
  SET_MODAL_LOGINORSIGNUP,
  SET_LOGIN_STATE,
  SET_LOGOUT_STATE,
  SET_MODAL_CHART,
  SET_MODAL_NEWCONTENT,
  SET_MODAL_EDITCONTENT,
  SET_MODAL_LOGOUT,
} from '../actions/index';

const defaultUserInfo = {
  userInfo: {
    id: -1,
    email: '',
    username: '',
    userPic: null,
    exp: 0,
  }, // 기본 유저 정보
  isLogin: false, //로그인 상태
  isShowLoginOrSignupModal: false, // 로그인or회원가입 모달 상태
  isShowQuizModal: false, // 퀴즈 모달 상태
  isShowSignoutModal: false, // 회원탈퇴 모달 상태
  isShowLogoutModal: false, // 로그아웃 모달 상태
  isShowChartModal: false, // 차트 모달 상태
  isShowNewContentModal: false, // 새로운 글 쓰기 모달상태
  isShowEditContentModal: false, // 글 수정 모달 상태
};

const userInfoReducer = (state = defaultUserInfo, action) => {
  switch (action.type) {
    case SET_MODAL_QUIZ:
      return {
        ...state,
        isShowQuizModal: action.isOpen,
      }; // 퀴즈 모달 상태 변경하기

    case SET_MODAL_LOGINORSIGNUP:
      return {
        ...state,
        isShowLoginOrSignupModal: action.isOpen,
      }; // 퀴즈 모달 상태 변경하기

    case SET_MODAL_CHART:
      return {
        ...state,
        isShowChartModal: action.isOpen,
      }; // 실시간 차트 모달 상태 변경하기

    case SET_MODAL_NEWCONTENT:
      return {
        ...state,
        isShowNewContentModal: action.isOpen,
      }; // 새로 글쓰기 모달 상태 변경하기

    case SET_MODAL_EDITCONTENT:
      return {
        ...state,
        isShowEditContentModal: action.isOpen,
      };

    case SET_MODAL_LOGOUT:
      return {
        ...state,
        isShowLogoutModal: action.isOpen,
      };
    case SET_LOGIN_STATE: // 로그인 reducer
      return {
        ...state,
        userInfo: action.userData,
        isLogin: action.isLogin,
      };

    case SET_LOGOUT_STATE: // 로그아웃 reducer
      return {
        ...defaultUserInfo,
      };

    default:
      // 기본 reducer
      return state;
  }
};

export default userInfoReducer;
