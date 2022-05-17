import React from 'react';
import { TempPage } from '@src/pages/TempPage';
import { useSelector } from 'react-redux';
import { RedirectInSomeSeconds } from './RedirectInSomeSeconds';

export const GuardedComponent = ({ guards, element }) => {
  const { userReducer } = useSelector(state => state);

  for (let index = 0; index < guards.length; index++) {
    const { resolver, redirectIfNotAllowed, messageIfRedirected } = guards[index];
    const isAllowed = resolver({ userReducer });

    console.log(
      `¿Cumple con la regla? ${window.location.pathname}
       ${isAllowed
        ? 'Sí, se permite el acceso '
        : 'No, se redirige a ' + redirectIfNotAllowed
      }`
    );

    if (!isAllowed) {
      return (<RedirectInSomeSeconds seconds={5} to={redirectIfNotAllowed}>
        <TempPage text={messageIfRedirected} />
      </RedirectInSomeSeconds>);
    }
  }

  return element;
};
