import { Button, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { TempPage } from './TempPage';

export const MyAccount = () => {
  const { userReducer } = useSelector(state => state);
  const isVerified = userReducer?.emailVerified;
  return (
    <>
      <TempPage text='Bienvenido a tu cuenta' />
      {
        isVerified
          ? (
            <Typography>Cuenta Verificada!</Typography>
          )
          : (
            <Button
              type='button'
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Verificar cuenta
            </Button>
          )
      }
    </>
  );
};
