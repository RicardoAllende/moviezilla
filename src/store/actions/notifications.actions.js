import { TYPES } from '../types';

export const hideSnackbarAction = () => ({
  type: TYPES.NOTIFICATIONS.HIDE_SNACKBAR,
});

export const showSnackbarAction = (payload) => ({
  type: TYPES.NOTIFICATIONS.SHOW_SNACKBAR,
  payload,
});
