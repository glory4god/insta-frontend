import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import type { Banner } from 'types/profile/types';

interface ProfileSliceProps {
  currentBanner: Banner;
}

const initialState: ProfileSliceProps = {
  currentBanner: 'main',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setCurrerntBanner: (state, action: PayloadAction<Banner>) => {
      state.currentBanner = action.payload;
    },
  },
});

export const { setCurrerntBanner } = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;

export function setBanner(banner: Banner) {
  return (dispatch: any) => {
    try {
      dispatch(setCurrerntBanner(banner));
    } catch (error) {}
  };
}

export function initialBanner() {
  return (dispatch: any) => {
    dispatch(setCurrerntBanner('main'));
  };
}
