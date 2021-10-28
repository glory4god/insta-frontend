import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { AWS_SERVER } from 'config';

type UserInfo = {
  username: string;
  profileImageUrl: string;
  accessToken: string;
};

type LoginData = {
  username: string;
  password: string;
};

interface UserSliceProps {
  login: boolean;
  userInfo: UserInfo;
  message: string;
}

const initialState: UserSliceProps = {
  login: false,
  userInfo: {
    username: '',
    profileImageUrl: '',
    accessToken: '',
  },
  message: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER: (state, action: PayloadAction<UserInfo>) => {
      state.message = '';
      state.login = true;
      state.userInfo = action.payload;
    },
    SET_ERROR: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    CLEAR_ERROR: (state) => {
      state.message = '';
    },
    LOGOUT: (state) => {
      state.login = false;
      state.userInfo = {
        username: '',
        profileImageUrl: '',
        accessToken: '',
      };
    },
  },
});

export const setUser = (data: LoginData) => {
  return async (dispatch: any) => {
    try {
      const response: any = await axios.post(
        `${AWS_SERVER}/user/login`,
        data,
      );
      console.log(response.data);
      dispatch(SET_USER(response.data));
    } catch (error: any) {
      console.log(error.response.data);
      dispatch(SET_ERROR(error.response.data.message));
    }
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    dispatch(LOGOUT());
  };
};

export const clearError = () => {
  return async (dispatch: any) => {
    dispatch(CLEAR_ERROR());
  };
};

export const { SET_USER, SET_ERROR, LOGOUT, CLEAR_ERROR } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
