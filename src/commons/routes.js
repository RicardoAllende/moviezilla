import { Home } from '@pages/Home';
import { Login } from '@pages/Login';
import Register from '@pages/Register';
import { TempPage } from '@src/pages/TempPage';

export const paramSeparator = ':';

export const loginId = 'login';
export const registerId = 'register';
export const homeId = 'home';

export const loginPath = '/auth/login';
export const registerPath = '/auth/register';
export const homePath = '/home';

export const routes = {
  [loginId]: {
    component: Login,
    path: loginPath,
    displayName: 'Iniciar sesión',
    tags: [],
  },
  'register': {
    component: Register,
    path: registerPath,
    displayName: 'Registrar usuario',
    tags: [],
  },
  [homeId]: {
    component: Home,
    path: homePath,
    displayName: 'Home',
    tags: [],
  },
  'movies': {
    component: TempPage,
    path: `/movies`,
    displayName: 'Películas 2',
    tags: ['navigation']
  },
  'movies.favorites': {
    component: TempPage,
    path: `/movies/favorites`,
    displayName: 'Mis favoritos',
    tags: ['navigation']
  },
  'movies.recommendations': {
    component: TempPage,
    path: `/movies/random`,
    displayName: 'Recomendaciones',
    tags: ['navigation']
  },
  'me': {
    component: TempPage,
    path: `/me`,
    displayName: 'Mi perfil',
    tags: ['profile',]
  },
  'configs': {
    component: TempPage,
    path: `/configs`,
    displayName: 'Configuraciones',
    tags: ['profile',]
  },
  'alerts': {
    component: TempPage,
    path: `/me/alerts`,
    displayName: 'Alertas',
    tags: ['profile',]
  },
};
