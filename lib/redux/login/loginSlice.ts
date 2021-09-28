import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyUserInfo } from 'types/profile/types';
import { testLoginUserData } from '../profile/profileApis';
import { RootState } from '../store';

interface LoginSliceProps {
  login: boolean;
  myUserInfo: MyUserInfo;
}

const initialState: LoginSliceProps = {
  login: true,
  myUserInfo: testLoginUserData,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    SET_LOGIN: (state, action: PayloadAction<string>) => {},
  },
});

export const { SET_LOGIN } = loginSlice.actions;
export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
