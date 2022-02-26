import {
  createAction,
  createReducer,
  props,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface AppState {
  searchText: string;
  searchResults: GithubUser[];
  isSearching: boolean;
  error: string;
  recents: RecentEntry[];
  isAppLoading: boolean;
  isDeletiongInProgress: boolean;
}

export interface RecentEntry {
  text: string;
  count: number;
}

export interface GithubSearchUserResult {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}

export interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}

export const initializeApp = createAction('[App] Initialize app');

export const initializeAppComplete = createAction(
  '[App] Initialize app completed',
  props<{ recents: RecentEntry[] }>()
);

export const clearRecents = createAction('[App] Clear recents');
export const clearRecentsCompleted = createAction(
  '[App] Clear recents completed'
);

export const removeRecent = createAction(
  '[App] Remove recent',
  props<{ recentEntry: RecentEntry }>()
);

export const search = createAction(
  '[App] Search',
  props<{ searchText: string }>()
);

export const searchCompleted = createAction(
  '[App] Search Completed',
  props<{ searchResults: GithubSearchUserResult; error: any }>()
);

export const initialState = {
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

export const isAppLoading = createSelector(
  searchState,
  (state: AppState) => state.isAppLoading
);

export const recents = createSelector(
  searchState,
  (state: AppState) => state.recents
);
