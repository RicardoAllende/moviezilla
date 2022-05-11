import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './commons/routes';
import { Navbar } from './components/Navbar';
import { useDispatch } from 'react-redux';
import { userLoginActionIfNotLoggedIn } from './store/actions/user.actions';
import { auth } from './services/firebase/init-config';
import { SnackBarNotification } from './components/SnackBarNotification';
import { renderRouteWithGuards } from './commons/routeUtils';
import { DarkModeThemeProvider } from './hocs/DarkModeThemeProvider.hoc';
import { getMovie } from './services/movies/MoviesService';
import { TempPage } from '@pages/TempPage';

const App = () => {
  const [previousSessionReady, setPreviousSessionReady] = useState(false);
  const dispatch = useDispatch();
  const renderRoutes = () => {
    return Object.keys(routes).map((routeId) => {
      return renderRouteWithGuards(routes[routeId]);
    });
  };

  useEffect(() => {
    // getMovie(550).then(({ data }) => console.log(data));
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      console.log('El usuario registrado es: ', firebaseUser);
      if (firebaseUser) {
        dispatch(userLoginActionIfNotLoggedIn(firebaseUser));
        // } else {
        // dispatch(userLogOutAction());
      }
      setPreviousSessionReady(true);
    });
    return () => unsubscribe();
  }, [setPreviousSessionReady]);

  return (
    <BrowserRouter>
      <DarkModeThemeProvider>
        <div>
          <SnackBarNotification />
          <Navbar />
          {
            !previousSessionReady
              ? (<TempPage text='Cargando sesión anterior' />)
              : (<Routes>
                {renderRoutes()}
                <Route path='*' element={<h1>No se encontró la página que buscabas</h1>} />
              </Routes>)
          }
        </div>
      </DarkModeThemeProvider>
    </BrowserRouter>
  );
};

export default App;
