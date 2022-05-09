import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from './init-config';
import { getTranslation } from './utils';

export const createUser = async ({ email, password, displayName }) => {
  console.log('creando usuario createUserWithEmailAndPassword', email, password);
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const { user } = userCredential;
      console.log('Se creó un usuario con las siguientes credenciales: ', userCredential);
      await updateUser(user, { displayName, photoURL: 'fd' });
      return {
        success: true,
        user,
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
    .then(({ user }) => {
      return {
        success: true,
        user,
      };
    })
    .catch(err => ({
      success: false,
      message: getTranslation(err?.code)
    }));
};

export const logoutFirebaseUser = () => {
  signOut(auth);
};
