// reducer들을 한번에 정리
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userInfoReducer from './userInfoReducer';
import userModalReducer from './userModalReducer';
import bestSearchReducer from './bestSearchReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userInfoReducer', 'bestSearchReducer'],
  blacklist: ['userModalReducer'],
};

const rootReducer = combineReducers({
  userInfoReducer,
  userModalReducer,
  bestSearchReducer,
});

export default persistReducer(persistConfig, rootReducer);
