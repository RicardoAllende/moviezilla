import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@store/reducers/user.reducer';
import { settingsReducer } from '@store/reducers/settings.reducer';

const reducer = {
  userReducer,
  settingsReducer,
};

const store = configureStore({
  reducer,
  devTools: process.env.ENVIROMENT === 'development',
});

export default store;
