import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './modal/modalSlice';
import profileSlice from './profile/profileSlice';

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
