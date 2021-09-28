import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyUserInfo } from 'types/profile/types';
import { RootState } from '../store';

interface LoginSliceProps {
  login: boolean;
  myUserInfo: MyUserInfo;
}

const initialState: LoginSliceProps = {
  login: true,
  myUserInfo: {
    id: 'winter',
    imageUrl: '/profile/winter.png',
    name: '윈터',
    webSite: 'www.github.com',
    introduce: 'NextLevel!',
    phone: '000-0000-0000',
    email: 'http://localhost:3000/winter',
    sex: '여성',
  },
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
