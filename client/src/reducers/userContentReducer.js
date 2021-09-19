// 유저가 쓴 글 관리 reducer
// 기본값: 유저가 작성한 글
// 기능 : 유저가 쓴 글 받아오기, 유저가 쓴 글 삭제, 유저가 쓴 글 수정

import {
  SET_USER_CONTENT,
  DELETE_CONTENT,
  EDIT_CONTENT,
} from '../actions/index';

const defaultUserContentInfo = {
  data: [],
};

const userContentReducer = (state = defaultUserContentInfo, action) => {
  switch (action.type) {
    case SET_USER_CONTENT: // 유저가 쓴 글 다 받아오기
      return { ...action.userContent };

    case DELETE_CONTENT: // 유저가 쓴 글 제거하는 reducer, payload로 contentId 들어옴
      let saveContents = state.data.filter(
        (ele) => ele.id !== action.payload.contentId
      );
      return Object.assign({}, { data: [...saveContents] });

    case EDIT_CONTENT:
      let editData = state.data.filter(
        (ele) => ele.id === action.payload.contentId
      );
      editData.wordMean = action.payload.wordMean;
      return Object.assign({}, { data: [...state.data] });

    default:
      // 기본 reducer
      return state;
  }
};

export default userContentReducer;
