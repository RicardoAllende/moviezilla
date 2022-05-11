import { v4 as uuid } from 'uuid';
import { TYPES } from '../types';
import { showSnackbarAction } from './notifications.actions';

export const userLoginActionAsync = ({ name }) => dispatch => {
  console.log('Haciendo dispatch con thunk', dispatch);
  const payload = {
    id: uuid(),
    name,
    start: new Date().getTime()
  };
  dispatch(userLoginAction(payload));
};

export const userLogOutAction2 = () => dispatch => {
  dispatch(userLogOutAction());
};

export const userLoginActionIfNotLoggedIn = (user) => (dispatch, getState) => {
  const { userReducer } = getState();
  if (!userReducer.uid) {
    dispatch(userLoginAction(user));
  }
};

export const userLoginAction = (user) => ({
  type: TYPES.USER.LOGIN,
  payload: {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
    displayName: user.displayName,
    authProviderId: user?.providerData[0]?.providerId || 'password',
  },
});

export const userLogOutAction = () => ({
  type: TYPES.USER.LOGOUT,
});

export const handleAuthResponse = (authResponse, onSuccess) => (dispatch) => {
  if (authResponse.success) {
    const { user } = authResponse;
    dispatch(userLoginAction(user));
    dispatch(showSnackbarAction({ message: `Bienvenido, ${user.displayName}` }));
    onSuccess();
  } else {
    dispatch(showSnackbarAction({ message: `${authResponse.message}` }));
    console.error('Error handlingAuthResponse: ', authResponse);
  }
};
