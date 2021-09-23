// 실시간 검색어 순위 보관

import { SET_BEST_SEAHCH } from '../actions/index';

const defaultUserInfo = {
  searchData: [],
};

const bestSearchReducer = (state = defaultUserInfo, action) => {
  switch (action.type) {
    case SET_BEST_SEAHCH:
      return {
        ...state,
        searchData: action.searchData,
      }; // 퀴즈 모달 상태 변경하기

    default:
      // 기본 reducer
      return state;
  }
};

export default bestSearchReducer;
