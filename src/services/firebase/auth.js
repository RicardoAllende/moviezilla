import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword
} from 'firebase/auth';

import { auth } from './init-config';
import { getTranslation } from './utils';

export const createUser = async ({ email, password }) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log('Se creó un usuario con las siguientes credenciales: ', userCredential);
      return {
        success: true,
        userCredential,
        message: 'User created successfully',
      };
    })
    .catch(err => ({
      success: false,
      message: getTranslation(err?.code)
    }));
};

export const updateUser = (user, { displayName, photoURL }) => {
  return updateProfile(user, { displayName, photoURL });
};

export const loginUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return {
        success: true,
        userCredential,
      };
    })
    .catch(err => ({
      success: false,
      message: getTranslation(err?.code)
    }));
};
