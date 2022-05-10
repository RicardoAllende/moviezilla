import { Container, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

export const TempPage = ({ text = '' }) => {
  const location = useLocation();
  return (
    <Container >
      <Typography
        component='h1'
        variant='h5'
        marginTop='6rem'
        textAlign='center'
      >
        {text} {location.href}
      </Typography>
    </Container>
  );
};
