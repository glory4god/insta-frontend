import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import modalSlice from './modal/modalSlice';
import profileSlice from './profile/profileSlice';
import userSlice from './user/userSlice';
import newPostSlice from './newPost/newPostSlice';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { ThunkAction } from 'redux-thunk';

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ['user'],
  // blacklist -> 그것만 제외합니다
};

const rootReducer = combineReducers({
  profile: profileSlice,
  modal: modalSlice,
  user: userSlice,
  newPost: newPostSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
