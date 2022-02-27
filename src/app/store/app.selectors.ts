import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.models';

export const searchState = createFeatureSelector<AppState>('search');
export const isSearching = createSelector(
  searchState,
  (state: AppState) => state.isSearching
);
export const searchText = createSelector(
  searchState,
  (state: AppState) => state.searchText
);
export const searchResults = createSelector(
  searchState,
  (state: AppState) => state.searchResults
);
export const error = createSelector(
  searchState,
  (state: AppState) => state.error
);

export const isAppLoading = createSelector(
  searchState,
  (state: AppState) => state.isAppLoading
);

export const recents = createSelector(
  searchState,
  (state: AppState) => state.recents
);
