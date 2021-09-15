import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import type { Banner, BoardData, UserData } from 'types/profile/types';

interface ProfileSliceProps {
  currentBanner: Banner;
  userData: UserData;
  boardData: BoardData[];
}

const initialState: ProfileSliceProps = {
  currentBanner: 'main',
  userData: {
    id: '',
    name: '',
    board: 0,
    follower: 0,
    following: 0,
    webSite: '',
    introduce: '',
    imageUrl: '',
  },
  boardData: [],
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    SET_BANNER: (state, action: PayloadAction<Banner>) => {
      state.currentBanner = action.payload;
    },
    SET_USER_DATA: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    SET_BOARD_DATA: (state, action: PayloadAction<BoardData[]>) => {
      state.boardData = action.payload;
    },
  },
});

export const { SET_BANNER, SET_USER_DATA, SET_BOARD_DATA } =
  profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;

export function setBanner(banner: Banner) {
  return (dispatch: any) => {
    try {
      dispatch(SET_BANNER(banner));
    } catch (error) {}
  };
}

export function initialBanner() {
  return (dispatch: any) => {
    dispatch(SET_BANNER('main'));
  };
}

export function setBoardData(data: BoardData[]) {
  return async (dispatch: any) => {
    dispatch(SET_BOARD_DATA(data));
  };
}

export function setUserData(data: UserData) {
  return async (dispatch: any) => {
    dispatch(SET_USER_DATA(data));
  };
}
