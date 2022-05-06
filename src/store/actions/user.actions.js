import { v4 as uuid } from 'uuid';
import { TYPES } from '../types';

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
  },
});

export const userLogOutAction = () => ({
  type: TYPES.USER.LOGOUT,
});

