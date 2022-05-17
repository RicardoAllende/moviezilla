import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { getNavigationRoutes, getProfileRoutes, getPublicPages } from '@src/commons/routeUtils';
import { useNavigate } from 'react-router-dom';
import { MovieZillaIcon } from './MovieZillaIcon';
import { logoutFirebaseUser } from '@src/services/firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { loginPath } from '@src/commons/routes';
import { logoutUserAction } from '@src/store/reducers/user.reducer';

const publicPages = getPublicPages();
const pages = getNavigationRoutes();
const settings = getProfileRoutes();

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { userReducer } = useSelector(state => state);
  const isLoggedIn = !!userReducer.uid;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (itm) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const closeSession = () => {
    setAnchorElUser(null);
    dispatch(logoutUserAction());
    logoutFirebaseUser().then(() => {
      navigate(loginPath);
    });
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <MovieZillaIcon sx={{
            background: 'white',
          }} />
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mx: 2, display: { xs: 'none', sm: 'flex' }, color: 'white' }}
          >
            MovieZilla
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: isLoggedIn ? 'flex' : 'none', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={() => navigate(page.path)}>
                  <Typography textAlign='center'>{page.displayName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isLoggedIn && pages.map((page) => (
              <Button
                key={page.path}
                onClick={() => navigate(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.displayName}
              </Button>
            ))}
          </Box>

          <Box sx={isLoggedIn ? { flexGrow: 0 } : { flexGrow: 0, display: 'none' }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.path} onClick={() => { setAnchorElUser(null); navigate(setting.path); }}>
                  <Typography textAlign='center'>{setting.displayName}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={closeSession}>
                <Typography textAlign='center'>Cerrar sesión</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {!isLoggedIn && (
            publicPages.map((page) => (
              <Button
                key={page.path}
                onClick={() => navigate(page.path)}
                sx={{ marginLeft: 2, color: 'white', display: 'block' }}
              >
                {page.displayName}
              </Button>
            ))
          )}
        </Toolbar>
      </Container >
    </AppBar >
  );
};
