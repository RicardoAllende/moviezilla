import { homeId, loginId, paramSeparator, routes } from './routes';

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

export const getRoutesByTag = (tag) => {
  return Object.keys(routes)
    .map(routeKey => routes[routeKey])
    .filter(route => route?.tags.includes(tag));
};

export const getProfileRoutes = () => getRoutesByTag('profile');

export const getNavigationRoutes = () => getRoutesByTag('navigation');
