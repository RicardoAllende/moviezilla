import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
};

export const settingsReducer = createSlice({
  name: 'settingsReducer',
  initialState,
  reducers: {
    setSettingsAction(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
  }
});

export const { setSettingsAction } = settingsReducer.actions;

// import { TYPES } from '@store/types';

// const initialState = {
//   darkMode: false,
// };

// export const settingsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case TYPES.SETTINGS.SET_SETTINGS:
//       return {
//         ...state,
//         ...action.payload
//       };
//     default:
//       return state;
//   };
// };
