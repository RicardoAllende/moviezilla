import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

export const ALLOWED_AUTH_PROVIDERS = {
  GITHUB: 'GITHUB',
  GOOGLE: 'GOOGLE',
};

export const AUTH_PROVIDERS = {
  [ALLOWED_AUTH_PROVIDERS.GITHUB]: GithubAuthProvider,
  [ALLOWED_AUTH_PROVIDERS.GOOGLE]: GoogleAuthProvider,
};
