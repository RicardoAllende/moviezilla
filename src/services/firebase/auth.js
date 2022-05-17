import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  signInWithPopup,
} from 'firebase/auth';
import { AUTH_PROVIDERS } from './firebase.types';

import { auth } from './init-config';
import { getTranslation } from './utils';

export const createUser = async ({ email, password, displayName, verifyEmail = false }) => {
  console.log('creando usuario createUserWithEmailAndPassword', email, password);
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const { user } = userCredential;
      console.log('Se creó un usuario con las siguientes credenciales: ', userCredential);
      if (verifyEmail) {
        console.log('Enviando email a ', email);
        sendEmailVerification(user);
      }
      await updateUser(user, { displayName });
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

export const sendEmailVerificationToUser = (user = null) => {
  sendEmailVerification(user || auth.currentUser);
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
  return signOut(auth);
};

export const loginWithExternalProvider = async (providerName) => {
  const providerClass = AUTH_PROVIDERS[providerName];
  if (!providerClass) {
    throw new Error(`${providerName} is not implemented!`);
  }

  const provider = new providerClass();
  return signInWithPopup(auth, provider)
    .then(function (result) {
      console.log('The result is: ', result);
      const credentials = providerClass.credentialFromResult(result);
      console.log(`The credentials are: `, credentials);
      return {
        user: result.user,
        credentials,
        success: true,
      };
    })
    .catch(err => ({
      success: false,
      message: getTranslation(err?.code)
    }));
};
