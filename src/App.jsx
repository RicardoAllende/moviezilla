import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { routes } from '@src/commons/routes';
import { Navbar } from '@components/Navbar';
import { userLoginActionIfNotLoggedIn } from '@store/actions/user.actions';
import { auth } from '@services/firebase/init-config';
import { SnackBarNotification } from '@components/SnackBarNotification';
import { renderRouteWithGuards } from '@src/commons/routeUtils';
import { DarkModeThemeProvider } from '@src/hocs/DarkModeThemeProvider.hoc';
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
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        dispatch(userLoginActionIfNotLoggedIn(firebaseUser));
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
