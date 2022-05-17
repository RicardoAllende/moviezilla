import React from 'react';
import { Home } from '@pages/Home';
import { Login } from '@pages/Login';
import Register from '@pages/Register';
import { TempPage } from '@pages/TempPage';
import { MyAccount } from '@pages/MyAccount';
import { Trends } from '@src/pages/Trends';
import { MediaDetail } from '@pages/MediaDetail';

export const paramSeparator = ':';

export const loginId = 'login';
export const registerId = 'register';
export const homeId = 'home';
export const myAccountId = 'my.account';

export const loginPath = '/auth/login';
export const registerPath = '/auth/register';
export const homePath = '/home';
export const myAccountPath = '/me';

export const routes = {
  'about.moviezilla': {
    component: () => <TempPage text='Moviezilla es una app increíble' />,
    path: '/',
    displayName: 'Acerca de moviezilla',
    scopes: [],
    guards: [], // Sin verificaciones, con o sin sesión
  },
  [loginId]: {
    component: Login,
    path: loginPath,
    displayName: 'Iniciar sesión',
    scopes: ['public-page'],
    guards: ['only-users-without-session'],
  },
  'register': {
    component: Register,
    path: registerPath,
    displayName: 'Registrar usuario',
    scopes: ['public-page'],
    guards: ['only-users-without-session'], // Sin sesión iniciada
  },
  [homeId]: {
    component: Home,
    path: homePath,
    displayName: 'Home',
    scopes: [],
    guards: ['auth'], // Solo usuarios autenticados
  },

  'trends': {
    component: Trends,
    path: '/tendencias',
    displayName: 'Tendencias',
    scopes: ['navigation'], // Aparece como enlace de navegación
    guards: ['auth'],
  },

  'media.show': {
    component: MediaDetail,
    path: `/media/:id`,
    displayName: 'Detalle de película',
    scopes: [],
    guards: ['auth'],
  },

  'movies': {
    component: () => <TempPage text='Películas' />,
    path: `/movies`,
    displayName: 'Películas',
    scopes: ['navigation'],
    guards: ['auth'],
  },
  'movies.favorites': {
    component: () => <TempPage text='Mis favoritos' />,
    path: `/movies/favorites`,
    displayName: 'Mis favoritos',
    scopes: ['navigation'],
    guards: ['auth', 'verified-user'],
  },
  'movies.recommendations': {
    component: () => <TempPage text='Recomendaciones' />,
    path: `/movies/random`,
    displayName: 'Recomendaciones',
    scopes: ['navigation'],
    guards: ['auth', 'verified-user'],
  },
  [myAccountId]: {
    component: MyAccount,
    path: `/me`,
    displayName: 'Mi perfil',
    scopes: ['profile'],
    guards: ['auth'],
  },
  'configs': {
    component: () => <TempPage text='Configuraciones' />,
    path: `/configs`,
    displayName: 'Configuraciones',
    scopes: ['profile'],
    guards: ['auth', 'verified-user'],
  },
  'alerts': {
    component: () => <TempPage text='Alertas' />,
    path: `/me/alerts`,
    displayName: 'Alertas',
    scopes: ['profile'],
    guards: ['auth', 'verified-user'],
  },
};

export const routeGuards = {
  'only-users-without-session': {
    'redirectIfNotAllowed': homePath,
    'resolver': ({ userReducer }) => {
      return !userReducer?.uid;
    },
    messageIfRedirected: 'Ya iniciaste sesión, en un momento te redirigiremos a tu cuenta',
  },
  'auth': {
    'redirectIfNotAllowed': loginPath,
    'resolver': ({ userReducer }) => {
      return !!userReducer?.uid;
    },
    messageIfRedirected: 'Necesitas iniciar sesión o registrarte para acceder a esta zona',
  },
  'verified-user': {
    'redirectIfNotAllowed': myAccountPath,
    'resolver': ({ userReducer }) => {
      return userReducer?.emailVerified;
    },
    messageIfRedirected: 'Necesitar verificar tu cuenta',
  },
};
