import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface NewPostSliceProps {
  id: number;
  name: string;
  exist: boolean;
  image: string;
  croppedImage: string;
  croppedAreaPixel: any;
}

interface UpdateImage {
  id: number;
  name: string;
  image: string;
}

interface UpdateCroppedImage {
  id: number;
  croppedImage: string;
}

const initialState: NewPostSliceProps[] = [{
  id: 1,
  name: '',
  exist: false,
  image: '',
  croppedImage: '',
  croppedAreaPixel: {
    width: 0,
    height: 0,
    x: 0,
    y: 0
  }
}];

export const newPostSlice = createSlice({
  name: 'newPost',
  initialState,
  reducers: {
    INIT_POST_IMAGE: (state) => {
      while (state.length > 1) {
        state.pop();
      }
      state[0] = initialState[0];
    },
    SET_POST_IMAGE: (state, action: PayloadAction<UpdateImage>) => {
      state[0].image = action.payload.image;
      state[0].name = action.payload.name;
    },
    ADD_POST_IMAGE: (state, action: PayloadAction<UpdateImage>) => {
      console.log('add', action.payload)
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        exist: false,
        image: action.payload.image,
        croppedImage: action.payload.image,
        croppedAreaPixel: {
          width: 0,
          height: 0,
          x: 0,
          y: 0
        }
      })
    },
    UPDATE_CROPPED_IMAGE: (state, action: PayloadAction<UpdateCroppedImage>) => {
      console.log(action.payload.id - 1)
      state[state.findIndex((element, index, arr) => element.id === action.payload.id)].croppedImage = action.payload.croppedImage;
    },
    UPDATE_CROPPED_AREA_PIXEL: (state, action: PayloadAction<any>) => {
      state[state.findIndex((element, index, arr) => element.id === action.payload.id)].croppedAreaPixel.width = action.payload.width;
      state[state.findIndex((element, index, arr) => element.id === action.payload.id)].croppedAreaPixel.height = action.payload.height;
      state[state.findIndex((element, index, arr) => element.id === action.payload.id)].croppedAreaPixel.x = action.payload.x;
      state[state.findIndex((element, index, arr) => element.id === action.payload.id)].croppedAreaPixel.y = action.payload.y;
      state[state.findIndex((element, index, arr) => element.id === action.payload.id)].exist = true;
    },
    DELETE_POST_IMAGE: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const initPostImage = () => {
  return async (dispatch: any) => {
    dispatch(INIT_POST_IMAGE());
  };
};

export const setPostImage = (data: UpdateImage) => {
  return async (dispatch: any) => {
    dispatch(SET_POST_IMAGE(data));
  };
};

export const addPostImage = (data: UpdateImage) => {
  return async (dispatch: any) => {
    dispatch(ADD_POST_IMAGE(data));
  };
};

export const updateCroppedImage = (data: UpdateCroppedImage) => {
  return async (dispatch: any) => {
    dispatch(UPDATE_CROPPED_IMAGE(data));
  };
};

export const updateCroppedAreaPixel = (data: any) => {
  return async (dispatch: any) => {
    dispatch(UPDATE_CROPPED_AREA_PIXEL(data));
  };
};

export const deletePostImage = (data: any) => {
  return async (dispatch: any) => {
    dispatch(DELETE_POST_IMAGE(data));
  };
};

export const { INIT_POST_IMAGE, SET_POST_IMAGE, ADD_POST_IMAGE, UPDATE_CROPPED_IMAGE, UPDATE_CROPPED_AREA_PIXEL, DELETE_POST_IMAGE } = newPostSlice.actions;
export const selectNewPost = (state: RootState) => state.newPost;

export default newPostSlice.reducer;
