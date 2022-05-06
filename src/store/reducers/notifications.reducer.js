import { TYPES } from '@store/types';

const initialState = {
  snackbar: {
    show: false,
    message: '',
  }
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.NOTIFICATIONS.SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          show: true,
          message: action.payload.message,
        }
      };
    case TYPES.NOTIFICATIONS.HIDE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          show: false,
        }
      };
    default:
      return state;
  };
};
