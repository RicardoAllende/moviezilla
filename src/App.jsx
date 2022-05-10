import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './commons/routes';
import { Navbar } from './components/Navbar';
import { useDispatch } from 'react-redux';
import { userLoginActionIfNotLoggedIn} from './store/actions/user.actions';
import { auth } from './services/firebase/init-config';
import { SnackBarNotification } from './components/SnackBarNotification';
import { renderRouteWithGuards } from './commons/routeUtils';
import { DarkModeThemeProvider } from './hocs/DarkModeThemeProvider.hoc';


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
              ? (<h1>Cargando sesión anterior</h1>)
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
