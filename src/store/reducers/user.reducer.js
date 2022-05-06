import { TYPES } from '@store/types';

const initialState = {};

export const userReducer = (state = initialState, action) => {
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

