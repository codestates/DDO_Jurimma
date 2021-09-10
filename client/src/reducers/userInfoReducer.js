// 유저의 개인정보 및 모달 닫/열림 상태 관리 reducer
// 기본값: 개인 정보 (username, email, userPic, exp), 로그인 상태, 모달 상태(로그인, 로그아웃, …)

export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';

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
};

const userInfoReducer = (state = defaultUserInfo, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE: // 로그인 상태 변경 reducer
      return {
        ...state,
        userInfo: action.userData,
        isLogin: action.isLogin,
      };
    default:
      // 기본 reducer
      return state;
  }
};

export default userInfoReducer;
