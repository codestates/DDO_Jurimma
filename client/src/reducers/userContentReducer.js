// 유저가 쓴 글 관리 reducer
// 기본값: 유저가 작성한 글
// 기능 : 유저가 쓴 글 받아오기, 유저가 쓴 글 삭제, 유저가 쓴 글 수정

import {
  SET_USER_CONTENT,
  DELETE_CONTENT,
  EDIT_CONTENT,
  EDIT_CONTENT_NUM,
} from '../actions/index';

const defaultUserContentInfo = {
  data: [],
  needEdit: -1, // edit할 번호 저장
};

const userContentReducer = (state = defaultUserContentInfo, action) => {
  switch (action.type) {
    case SET_USER_CONTENT: // 유저가 쓴 글 다 받아오기
      return { ...state, data: [...action.userContent] };

    case DELETE_CONTENT: // 유저가 쓴 글 제거하는 reducer, payload로 contentId 들어옴
      let saveContents = state.data.filter(
        (ele) => ele.id !== action.payload.contentId
      );
      return {
        ...state,
        data: saveContents,
      };

    case EDIT_CONTENT:
      let editData = state.data.filter((ele) => ele.id === action.contentId);
      editData.wordMean = action.wordMean;
      return Object.assign({}, state, { data: [...state.data] });

    case EDIT_CONTENT_NUM:
      return {
        ...state,
        needEdit: action.userContentId,
      };

    default:
      // 기본 reducer
      return state;
  }
};

export default userContentReducer;
