import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snackbar: {
    show: false,
    message: '',
  }
};

export const notificationsSlice = createSlice({
  name: 'notificationsReducer',
  initialState,
  reducers: {
    showSnackbarAction(state, action) {
      console.log('ShowSnackbar');
      state.snackbar.show = true;
      state.snackbar.message = action.payload.message;
    },
    hideSnackbarAction(state) {
      console.log('hideSnackbar');
      state.snackbar.show = false;
    }
  }
});

export const { showSnackbarAction, hideSnackbarAction } = notificationsSlice.actions;
