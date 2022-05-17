import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@store/reducers/user.reducer';
import { settingsReducer } from '@store/reducers/settings.reducer';
import { notificationsSlice } from '@store/reducers/notifications.reducer';
import { trendsReducer } from '@src/store/reducers/trends.reducer';

export const initStore = (preloadedState) => {
  const reducer = {
    [userReducer.name]: userReducer.reducer,
    [settingsReducer.name]: settingsReducer.reducer,
    [notificationsSlice.name]: notificationsSlice.reducer,
    trendsReducer,
  };

  return configureStore({
    reducer, preloadedState,
    devTools: process.env.ENVIROMENT === 'development',
  });
};

const store = initStore();
export default store;
