import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import MaterialLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Facebook, Google } from '@mui/icons-material';
import { MovieZillaIcon } from '@src/components/MovieZillaIcon';
import { Link, useNavigate } from 'react-router-dom';
import { homePath, registerPath } from '@src/commons/routes';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { loginUser } from '@src/services/firebase/auth';
import { emailRegex } from '@src/utils/regularExpressions';
import { userLoginAction } from '@src/store/actions/user.actions';
import { useDispatch } from 'react-redux';
import { showSnackbarAction } from '@src/store/actions/notifications.actions';


export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    loginUser(data.email, data.password)
      .then((response) => {
        if (response.success) {
          dispatch(userLoginAction(response.user));
          dispatch(showSnackbarAction({ message: `Bienvenido, ${response.user.displayName}` }));
          navigate(homePath);
        } else {
          dispatch(showSnackbarAction({ message: `${response.message}` }));
          console.error('El erro es: ', response);
        }
        console.log('La respuesta es: ', response);
      })
      .catch(err => {
        console.error('Hubo un error: ', err);
      });
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
          Inicia sesión en moviezilla
        </Typography>
        <Box
          component={FormContainer}
          onSuccess={handleSubmit}
          defaultValues={{
            email: 'rinosaurio@yopmail.com',
            password: 'Secret123'
          }}
          sx={{ mt: 1 }}
        >
          <Button
            type='submit'
            fullWidth
            variant='outlined'
            sx={{ my: 1 }}
            startIcon={<Facebook />}
          >
            Inicia con Facebook
          </Button>
          <Button
            type='submit'
            fullWidth
            variant='outlined'
            sx={{ my: 1 }}
            startIcon={<Google />}
          >
            Inicia con Google
          </Button>
          <TextFieldElement
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            validation={{ pattern: { value: emailRegex, message: 'Invalid email' } }}
          />
          <TextFieldElement
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar sesión
          </Button>

          <Grid container>
            <Grid item xs>
              <MaterialLink variant='body2'>
                Olvidé mi contraseña
              </MaterialLink>
            </Grid>
            <Grid item>
              <MaterialLink component={Link} to={registerPath} variant='body2'>
                ¿No tienes una cuenta? Regístrate aquí
              </MaterialLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
