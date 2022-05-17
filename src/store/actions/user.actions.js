import { showSnackbarAction } from '@store/reducers/notifications.reducer';
import { loginUserAction } from '@store/reducers/user.reducer';

export const userLoginActionIfNotLoggedIn = (user) => (dispatch, getState) => {
  const { userReducer } = getState();
  if (!userReducer.uid) {
    dispatch(userLoginAction(user));
  }
};

const userLoginAction = (user) => loginUserAction({
  uid: user.uid,
  email: user.email,
  emailVerified: user.emailVerified,
  isAnonymous: user.isAnonymous,
  createdAt: user.createdAt,
  lastLoginAt: user.lastLoginAt,
  displayName: user.displayName,
  authProviderId: user?.providerData[0]?.providerId || 'password',
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
