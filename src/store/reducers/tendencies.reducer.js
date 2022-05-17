import { createAction, createReducer } from '@reduxjs/toolkit';
import { TYPES } from '@store/types';

const initialState = {
  medias: [],
  currentPage: 0,
};

export const appendTendenciesAction = createAction(TYPES.TENDENCIES.APPEND_MEDIAS);
export const clearTendenciesAction = createAction(TYPES.TENDENCIES.CLEAR_MEDIAS);

export const tendenciesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(appendTendenciesAction,
      (state, action) => ({
        ...state,
        medias: [...state.medias, ...action.payload.medias],
        currentPage: state.currentPage + 1,
      })
    )
    .addCase(clearTendenciesAction,
      (state) => ({ ...state, medias: [] })
    );
});
