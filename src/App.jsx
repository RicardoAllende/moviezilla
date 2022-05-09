import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './commons/routes';
import { Navbar } from './components/Navbar';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { userLoginAction, userLogOutAction } from './store/actions/user.actions';
import { auth } from './services/firebase/init-config';
import { showSnackbarAction } from './store/actions/notifications.actions';
import { SnackBarNotification } from './components/SnackBarNotification';

const publicTheme = createTheme({
  palette: {
    primary: {
      main: '#82ba08', //orange[500],
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});
const loggedInTheme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  }
});

const App = () => {
  const dispatch = useDispatch();
  const renderRoutes = () => {
    return Object.keys(routes).map((routeId) => {
      const { path, component: Component } = routes[routeId];
      return (<Route key={routeId} path={path} element={<Component />} />);
    });
  };
  const [log, setLog] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      console.log('El usuario registrado es: ', firebaseUser);
      if (firebaseUser) {
        dispatch(userLoginAction(firebaseUser));
      } else {
        dispatch(userLogOutAction());
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={log ? publicTheme : loggedInTheme}>
        <div>
          <Button onClick={() => dispatch(showSnackbarAction({ message: 'Rinosaurio estuvo aquí' }))}>Open simple snackbar</Button>
          <SnackBarNotification />
          <ReduxExample></ReduxExample>
          <Navbar />
          <Routes>
            {renderRoutes()}
            <Route path='*' element={<h1 >No se encontró la página que buscabas</h1>} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
