import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board, UserData } from 'types/profile/types';
import { getProfileData } from '../profile/profileApis';
import { RootState } from '../store';

interface ModalSliceProps {
  showBoardModal: boolean;
  selectedBoard: Board | undefined;
  selectedBoardUser: UserData | undefined;
}

const initialState: ModalSliceProps = {
  showBoardModal: false,
  selectedBoard: undefined,
  selectedBoardUser: undefined,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    SET_BOARD_MODAL: (state, action: PayloadAction<boolean>) => {
      state.showBoardModal = action.payload;
    },
    SET_SELECETED_BOARD: (state, action: PayloadAction<Board>) => {
      state.selectedBoard = action.payload;
    },
    SET_SELECETED_BOARD_USER: (state, action: PayloadAction<UserData>) => {
      state.selectedBoardUser = action.payload;
    },
  },
});

export const {
  SET_BOARD_MODAL,
  SET_SELECETED_BOARD,
  SET_SELECETED_BOARD_USER,
} = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;

export function setBoardModal(state: boolean) {
  return (dispatch: any) => {
    dispatch(SET_BOARD_MODAL(state));
  };
}

export function setSelectedModal(board: Board) {
  return async (dispatch: any) => {
    dispatch(SET_SELECETED_BOARD(board));
    dispatch(
      SET_SELECETED_BOARD_USER((await getProfileData(board.name)) as UserData),
    );
  };
}
