import { Container, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RedirectInSomeSeconds } from './RedirectInSomeSeconds';

export const GuardedComponent = ({ guards, element }) => {
  const { userReducer } = useSelector(state => state);

  for (let index = 0; index < guards.length; index++) {
    const { resolver, redirectIfNotAllowed } = guards[index];
    const isAllowed = resolver({ userReducer });

    console.log(
      `¿Cumple con la regla? ${window.location.pathname}
       ${isAllowed
        ? 'Sí, se permite el acceso '
        : 'No, se redirige a ' + redirectIfNotAllowed
      }`
    );

    if (!isAllowed) {
      return (<RedirectInSomeSeconds seconds={3} to={redirectIfNotAllowed}>
        <Container >
          <Typography
            component='h1'
            variant='h5'
            marginTop='6rem'
            textAlign='center'
          >
            No tienes acceso a esta sección. Serás redirigido en unos momentos
          </Typography>
        </Container>
      </RedirectInSomeSeconds>);
    }
  }

  return element;
};
