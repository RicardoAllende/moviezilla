import { v4 as uuid } from 'uuid';
import { TYPES } from '../types';

export const userLoginActionAsync = ({ name }) => dispatch => {
  console.log('Haciendo dispatch con thunk', dispatch)
  const payload = {
    id: uuid(),
    name,
    start: new Date().getTime()
  }
  dispatch(userLoginAction(payload));
}

export const userLogOutAction2 = () => dispatch => {
  dispatch(userLogOutAction())
};

export const userLoginAction = (payload) => ({ type: TYPES.USER.LOGIN, payload });

export const userLogOutAction = () => ({
  type: TYPES.USER.LOGOUT,
});

