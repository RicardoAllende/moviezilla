import { createAction, createReducer } from '@reduxjs/toolkit';
import { TYPES } from '@store/types';

const initialState = {
  medias: [],
  currentPage: 0,
  currentTrend: null
};

export const appendTrendsAction = createAction(TYPES.TRENDS.APPEND_MEDIAS);
export const clearTrendsAction = createAction(TYPES.TRENDS.CLEAR_MEDIAS);
export const setCurrentTrendAction = createAction(TYPES.TRENDS.SET_CURRENT_TREND);

export const trendsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(appendTrendsAction,
      (state, action) => ({
        ...state,
        medias: [...state.medias, ...action.payload.medias],
        currentPage: state.currentPage + 1,
      })
    )
    .addCase(setCurrentTrendAction,
      (state, action) => ({
        ...state,
        currentTrend: action.payload,
      })
    )
    .addCase(clearTrendsAction,
      (state) => ({ ...state, medias: [] })
    );
});
