import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './login/loginSlice';
import modalSlice from './modal/modalSlice';
import profileSlice from './profile/profileSlice';

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    modal: modalSlice,
    login: loginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
