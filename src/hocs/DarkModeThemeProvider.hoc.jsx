import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#82ba08', //orange[500],
    },
    // neutral: {
    //   main: '#64748B',
    //   contrastText: '#fff',
    // },
  },
});

export const DarkModeThemeProvider = ({ children }) => {
  const { darkMode } = useSelector(state => state.settingsReducer);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      {children}
    </ThemeProvider>
  );
};
