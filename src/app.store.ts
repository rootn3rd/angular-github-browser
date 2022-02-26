import { createAction, createReducer, props, on } from '@ngrx/store';

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
