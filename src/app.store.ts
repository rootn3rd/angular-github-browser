import {
  createAction,
  createReducer,
  props,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

interface AppState {
  searchText: string;
  searchResults: GithubUserResults[];
  isSearching: boolean;
  error: string;
}

interface GithubUserResults {
  url: string;
}

export const search = createAction(
  '[App] Search',
  props<{ searchText: string }>()
);

export const searchCompleted = createAction(
  '[App] Search Completed',
  props<{ searchResults: GithubUserResults[]; error: any }>()
);

export const initialState = {
  searchText: '',
  searchResults: [],
  isSearching: false,
  error: null,
};

export const appReducer = createReducer(
  initialState,
  on(search, (state, { searchText }) => {
    return {
      ...state,
      searchText,
      isSearching: true,
      error: null,
    };
  }),

  on(searchCompleted, (state, { searchResults, error }) => {
    if (error) {
      return {
        ...state,
        error: error.message,
        isSearching: false,
        searchResults: [],
      };
    }
    return {
      ...state,
      error: null,
      isSearching: false,
      searchResults,
    };
  })
);

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
