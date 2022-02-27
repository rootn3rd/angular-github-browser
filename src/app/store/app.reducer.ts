import { createReducer, on } from '@ngrx/store';
import {
  initializeApp,
  initializeAppComplete,
  clearRecents,
  clearRecentsCompleted,
  removeRecent,
  search,
  searchCompleted,
  clearSearch,
} from './app.actions';

const initialState = {
  isAppLoading: false,
  isDeletiongInProgress: false,
  searchText: '',
  searchResults: [],
  isSearching: false,
  error: null,
  recents: [],
};

export const appReducer = createReducer(
  initialState,
  on(initializeApp, (state) => {
    return {
      ...state,
      isAppLoading: true,
    };
  }),

  on(initializeAppComplete, (state, { recents }) => {
    return {
      ...state,
      recents: recents || [],
      isAppLoading: false,
    };
  }),

  on(clearRecents, (state) => {
    return {
      ...state,
      isDeletiongInProgress: true,
    };
  }),
  on(clearRecentsCompleted, (state) => {
    return {
      ...state,
      isDeletiongInProgress: false,
      recents: [],
    };
  }),
  on(removeRecent, (state, { recentEntry }) => {
    return {
      ...state,
      recents: state.recents.filter((r) => r != recentEntry),
    };
  }),

  on(search, (state, { searchText }) => {
    return {
      ...state,
      searchText,
      isSearching: true,
      error: null,
      searchResults: [],
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
      searchResults: searchResults.items,
      recents: [
        { text: state.searchText, count: searchResults.total_count },
        ...state.recents.filter((r) => r.text !== state.searchText),
      ],
    };
  }),

  on(clearSearch, (state) => {
    return {
      ...state,
      searchText: '',
      searchResults: [],
      isSearching: false,
      error: null,
    };
  })
);
