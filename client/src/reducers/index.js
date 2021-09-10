// reducer들을 한번에 정리
import { combineReducers } from 'redux';
import userInfoReducer from './userInfoReducer';
import userContentReducer from './userContentReducer';

const rootReducer = combineReducers({
  userInfoReducer,
  userContentReducer,
});

export default rootReducer;
