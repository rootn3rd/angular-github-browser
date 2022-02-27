import { createAction, props } from '@ngrx/store';
import { RecentEntry, GithubSearchUserResult } from './app.models';

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

export const clearSearch = createAction('[App] Clear Search');

export const searchCompleted = createAction(
  '[App] Search Completed',
  props<{ searchResults: GithubSearchUserResult; error: any }>()
);
