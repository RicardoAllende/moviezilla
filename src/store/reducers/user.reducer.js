import { TYPES } from '@store/types';

const initialState = {
  id: '',
  name: '',
  start: ''
};

export const userReducer = (state = initialState, action) => {
  switch (action?.type) {
    case TYPES.USER.LOGIN:
      return {
        ...state,
        id: action?.payload?.id,
        name: action?.payload?.name,
        start: action?.payload?.start,
      };
    case TYPES.USER.LOGOUT:
      return initialState;
    default:
      return state;
  };
};

