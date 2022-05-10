import React from 'react';
import { GuardedComponent } from '@src/components/GuardedComponent';
import { Route } from 'react-router-dom';
import { homeId, loginId, paramSeparator, routeGuards, routes } from './routes';

export const findRouteById = (id) => {
  const route = routes[id];
  if (!route) {
    throw new Error(`Route ${id} not found`);
  }
  return route;
};

export const getDefaultRoute = (isAuth = false) => {
  return isAuth ? findRouteById(loginId) : findRouteById(homeId);
};

const createQueryString = (name, value) => {
  return `${name}${value ? ('=' + value) : ''}`;
};

const routeHasRequiredParams = (route) => {
  return route.indexOf(paramSeparator) !== -1;
};

const copyString = (originalStr) => (' ' + originalStr).slice(1);

export const replacePathParams = (path, optionalParams = {}) => {
  let replacedUri = copyString(path);
  let queryStrings = [];

  for (const paramKey in optionalParams) {
    let paramKeyInRoute = `:${paramKey}`;
    const paramValue = optionalParams[paramKey];
    const isRequiredParamParam = replacedUri.indexOf(paramKeyInRoute) !== -1;
    if (isRequiredParamParam) {
      replacedUri = replacedUri.replace(paramKeyInRoute, paramValue);
      continue;
    }
    queryStrings.push(createQueryString(paramKey, paramValue));
  }

  if (routeHasRequiredParams(replacedUri)) {
    throw new Error(
      `The route still needs some params [${replacedUri}]`
    );
  }

  return (queryStrings.length) ? `${replacedUri}?${queryStrings.join('&')}` : replacedUri;
};

export const resolveUri = (routeId, optionalParams = {}) => {
  const route = findRouteById(routeId);
  return replacePathParams(route.path, optionalParams);
};

export const getRoutesByScope = (tag) => {
  return Object.keys(routes)
    .map(routeKey => routes[routeKey])
    .filter(route => route?.scopes.includes(tag));
};

export const getProfileRoutes = () => getRoutesByScope('profile');

export const getNavigationRoutes = () => getRoutesByScope('navigation');

export const getPublicPages = () => getRoutesByScope('public-page');

export const renderRouteWithGuards = (route) => {
  const { guards: routeGuardIds, component: Component, path } = route;

  const hasGuards = routeGuardIds.length > 0;
  const guardResolvers = routeGuardIds.map(guard => routeGuards[guard]);

  const element = (hasGuards)
    ? (<GuardedComponent guards={guardResolvers} element={<Component></Component>} />)
    : (<Component />);

  return (<Route key={path} path={path} element={element} />);
};
