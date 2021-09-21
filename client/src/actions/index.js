// 어떤 행동을 할지 정의해 둘 actions
export const SET_LOGIN_STATE = 'SET_LOGIN_STATE'; // 로그인 상태 변경(=로그인)
export const SET_LOGOUT_STATE = 'SET_LOGOUT_STATE'; // 로그아웃 상태 변경
export const EDIT_USERINFO = 'EDIT_USERINFO'; // 유저 정보(=이름, 비밀번호, 사진) 변경하기
export const SET_MODAL_LOGINORSIGNUP = 'SET_MODAL_LOGINORSIGNUP'; // 로그인or회원가입 모달 상태
export const SET_MODAL_QUIZ = 'SET_MODAL_QUIZ'; // 퀴즈 모달 상태
export const SET_MODAL_SIGNOUT = 'SET_MODAL_SIGNOUT'; // 회원탈퇴 모달 상태
export const SET_MODAL_LOGOUT = 'SET_MODAL_LOGOUT'; // 로그아웃 모달 상태
export const SET_MODAL_CHART = 'SET_MODAL_CHART'; // 차트 모달 상태
export const SET_MODAL_NEWCONTENT = 'SET_MODAL_NEWCONTENT'; // 글 생성 모달 상태
export const SET_MODAL_EDITCONTENT = 'SET_MODAL_EDITCONTENT'; // 글 수정 모달 상태
export const SET_MODAL_MINIMENU = 'SET_MODAL_MINIMENU'; // window 창이 줄어들었을 때 hamburger bar 클락하면 나오는 모달
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'; // accessToken 업데이트 및 localStorage 업뎃
export const SET_USER_INFO = 'SET_USER_INFO'; // 유저 정보 요청

export const SET_USER_CONTENT = 'SET_USER_CONTENT'; // 유저가 쓴 글 받아오기
export const DELETE_CONTENT = 'DELETE_CONTENT'; // 유저가 쓴 글 삭제
export const EDIT_CONTENT = 'EDIT_CONTENT'; // 유저가 쓴 글 수정

export const setLoginOrSignupModal = (isOpen) => {
  return {
    type: SET_MODAL_LOGINORSIGNUP,
    isOpen,
  };
};

export const setQuizModal = (isOpen) => {
  return {
    type: SET_MODAL_QUIZ,
    isOpen,
  };
};

export const setChartModal = (isOpen) => {
  return {
    type: SET_MODAL_CHART,
    isOpen,
  };
};

export const setMiniMenuModal = (isOpen) => {
  return {
    type: SET_MODAL_MINIMENU,
    isOpen,
  };
};

export const setNewContentModal = (isOpen) => {
  return {
    type: SET_MODAL_NEWCONTENT,
    isOpen,
  };
};

export const setEditContentModal = (isOpen) => {
  return {
    type: SET_MODAL_EDITCONTENT,
    isOpen,
  };
};

export const setLogoutModal = (isOpen) => {
  return {
    type: SET_MODAL_LOGOUT,
    isOpen,
  };
};

export const setSignOutModal = (isOpen) => {
  return {
    type: SET_MODAL_SIGNOUT,
    isOpen,
  };
};

export const setLogin = (isLogin) => {
  return {
    type: SET_LOGIN_STATE,
    isLogin,
  };
};

export const setLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userInfo');
  return {
    type: SET_LOGOUT_STATE,
  };
};

export const setAccessToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
  return {
    type: SET_ACCESS_TOKEN,
    accessToken,
  };
};

export const setUserInfo = (userInfo) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  return {
    type: SET_USER_INFO,
    userInfo,
  };
};
export const getContent = (userContent) => {
  return {
    type: SET_USER_CONTENT,
    userContent,
  };
};

export const deleteContent = (contentId) => {
  return {
    type: DELETE_CONTENT,
    contentId,
  };
};

export const editContent = (contentId, wordMean) => {
  return {
    type: EDIT_CONTENT,
    contentId,
    wordMean,
  };
};
