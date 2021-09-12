import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profile/profileSlice';

export const store = configureStore({
  reducer: {
    profile: profileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
