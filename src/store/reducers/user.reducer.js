import { createSlice } from '@reduxjs/toolkit';
import { TYPES } from '@store/types';

const initialState = {};

export const userReducer1 = (state = initialState, action) => {
  switch (action?.type) {
    case TYPES.USER.LOGIN:
      return {
        ...state,
        ...action?.payload,
      };
    case TYPES.USER.LOGOUT:
      return initialState;
    default:
      return state;
  };
};

export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    loginUserAction(state, { payload } = {}) {
      return {
        ...state,
        ...payload,
      };
    },
    logoutUserAction() {
      return initialState;
    }
  }
});

export const { loginUserAction, logoutUserAction } = userReducer.actions;
