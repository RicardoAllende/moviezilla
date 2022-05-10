import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import MaterialLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { homePath, loginPath } from '@src/commons/routes';
import { Facebook, Google } from '@mui/icons-material';
import { MovieZillaIcon } from '@src/components/MovieZillaIcon';
import { FormContainer, TextFieldElement, PasswordElement, CheckboxElement } from 'react-hook-form-mui';
import { emailRegex } from '@src/utils/regularExpressions';
import { createUser } from '@src/services/firebase/auth';
import { useDispatch } from 'react-redux';
import { userLoginAction } from '@src/store/actions/user.actions';
import { showSnackbarAction } from '@src/store/actions/notifications.actions';

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    // console.log('La información es: ', data, data.sendEmail, !!data.sendEmail);
    // return;
    const user = createUser({
      password: data.password,
      email: data.email,
      displayName: `${data.firstName} ${data.lastName}`,
      verifyEmail: !!data.sendEmail,
    }).then((response) => {
      if (response.success) {
        dispatch(userLoginAction(response.user));
        dispatch(showSnackbarAction({ message: `Bienvenido, ${data.firstName}` }));
        navigate(homePath);
      } else {
        dispatch(showSnackbarAction({ message: `${response.message}` }));
        console.error('El erro es: ', response);
      }
    });
    console.log(data, user);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <MovieZillaIcon />
        <Typography component='h1' variant='h5'>
          Regístrate en MovieZilla
        </Typography>
        <Button
          type='submit'
          fullWidth
          variant='outlined'
          sx={{ my: 1 }}
          startIcon={<Facebook />}
        >
          Registrar con Facebook
        </Button>
        <Button
          type='submit'
          fullWidth
          variant='outlined'
          sx={{ my: 1 }}
          startIcon={<Google />}
        >
          Registrar con Google
        </Button>
        <Box
          component={FormContainer}
          defaultValues={{
            firstName: 'Ricardo',
            lastName: 'Allende',
            email: 'rinosaurio@yopmail.com',
            password: 'Secret123',
            confirmPassword: 'Secret123'
          }}
          onSuccess={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='Nombre'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                required
                fullWidth
                id='lastName'
                label='Apellido'
                name='lastName'
                autoComplete='family-name'

              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldElement
                required
                fullWidth
                id='email'
                label='Correo electrónico'
                name='email'
                autoComplete='email'
                validation={{ pattern: { value: emailRegex, message: 'Invalid email' } }}
                pattern={emailRegex}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordElement
                required
                fullWidth
                name='password'
                label='Contraseña'
                type='password'
                id='password'
                onChange={(...params) => console.log('Haciendo cambio con: ', params)}
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordElement
                required
                fullWidth
                id='confirmPassword'
                label='Confirmar contraseña'
                name='confirmPassword'
                validation={{
                  validate: () => {
                    return password?.value === confirmPassword?.value || 'Las contraseñas no coinciden';
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                sx={{ px: '1rem' }}
                control={<CheckboxElement name='sendEmail' color='primary' />}
                label='Me gustaría confirmar mi email.'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Regístrame
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <MaterialLink component={Link} to={loginPath} href='#' variant='body2'>
                ¿Ya tienes una cuenta? Inicia sesión
              </MaterialLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
