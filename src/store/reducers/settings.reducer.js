import { TYPES } from '@store/types';

const initialState = {
  defaultTheme: false,
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SETTINGS.SET_SETTINGS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  };
};
