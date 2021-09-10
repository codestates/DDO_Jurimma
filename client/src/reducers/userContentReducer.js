// 유저가 쓴 글 관리 reducer
// 기본값: 유저가 작성한 글

export const DELETE_CONTENT = 'DELETE_CONTENT';

const defaultUserContentInfo = {
  data: [
    {
      id: -1,
      wordName: '',
      wordMean: '',
      thumbsup: 0,
      createdAt: null,
      updatedAt: null,
    },
  ],
};

const userContentReducer = (state = defaultUserContentInfo, action) => {
  switch (action.type) {
    case DELETE_CONTENT: // 내가 쓴 글 제거하는 reducer, payload로 contentId 들어옴
      let saveContents = state.data.filter(
        (ele) => ele.id !== action.payload.contentId
      );
      return Object.assign({}, { data: [...saveContents] });
    default:
      // 기본 reducer
      return state;
  }
};

export default userContentReducer;
