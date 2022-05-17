import { Snackbar } from '@mui/material';
import { hideSnackbarAction } from '@src/store/reducers/notifications.reducer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const SnackBarNotification = () => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector(store => store.notificationsReducer);

  return (
    <Snackbar
      open={snackbar.show}
      autoHideDuration={5000}
      onClose={() => dispatch(hideSnackbarAction())}
      message={snackbar.message}
    />
  );
};
