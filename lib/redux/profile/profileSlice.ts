import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import type { Banner, Board, Profile, UserBoards } from 'types/profile/types';
import { getProfileData } from './profileApis';

interface ProfileSliceProps {
  currentBanner: Banner;
  userData: Profile;
  boardData: UserBoards;
}

const initialState: ProfileSliceProps = {
  currentBanner: 'main',
  userData: {
    username: '',
    imageUrl: '',
    name: '',
    boardCnt: 0,
    followerCnt: 0,
    followingCnt: 0,
    webSite: '',
    email: '',
    phone: '',
    introduce: '',
  },
  boardData: {
    writer: {
      username: '',
      imageUrl: '',
      name: '',
    },
    boards: [],
  },
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    SET_BANNER: (state, action: PayloadAction<Banner>) => {
      state.currentBanner = action.payload;
    },
    SET_USER_DATA: (state, action: PayloadAction<Profile>) => {
      state.userData = action.payload;
    },
    SET_BOARD_DATA: (state, action: PayloadAction<UserBoards>) => {
      state.boardData = action.payload;
    },
  },
});

export const { SET_BANNER, SET_USER_DATA, SET_BOARD_DATA } =
  profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;

export function setBanner(banner: Banner): AppThunk {
  return (dispatch: any) => {
    try {
      dispatch(SET_BANNER(banner));
    } catch (error) {}
  };
}

export function initialBanner(): AppThunk {
  return (dispatch: any) => {
    dispatch(SET_BANNER('main'));
  };
}

export function setBoardData(data: UserBoards): AppThunk {
  return (dispatch: any) => {
    dispatch(SET_BOARD_DATA(data));
  };
}

export function setUserData(data: Profile): AppThunk {
  return (dispatch: any) => {
    dispatch(SET_USER_DATA(data));
  };
}
