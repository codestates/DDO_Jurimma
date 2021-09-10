// 어떤 행동을 할지 정의해 둘 actions
export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const DELETE_CONTENT = 'DELETE_CONTENT';

export const setLogin = (userData, isLogin) => {
  return {
    type: SET_LOGIN_STATE,
    userData,
    isLogin,
  };
};

export const deleteContent = (contentId) => {
  return {
    type: DELETE_CONTENT,
    contentId,
  };
};
