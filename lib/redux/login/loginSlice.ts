import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface LoginSliceProps {
  login: boolean;
  name: string;
}

const initialState: LoginSliceProps = {
  login: true,
  name: 'winter',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    SET_LOGIN: (state, action: PayloadAction<string>) => {},
  },
});

export const {} = loginSlice.actions;
export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
