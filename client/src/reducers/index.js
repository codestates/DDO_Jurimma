// reducer들을 한번에 정리
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userInfoReducer from './userInfoReducer';
import userContentReducer from './userContentReducer';
import userModalReducer from './userModalReducer';
import bestSearchReducer from './bestSearchReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userInfoReducer', 'bestSearchReducer'],
  blacklist: ['userModalReducer', 'userContentReducer'],
};

const rootReducer = combineReducers({
  userInfoReducer,
  userContentReducer,
  userModalReducer,
  bestSearchReducer,
});

export default persistReducer(persistConfig, rootReducer);
