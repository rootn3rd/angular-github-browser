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

export const clearSearch = createAction('[App] Clear Search');

export const searchCompleted = createAction(
  '[App] Search Completed',
  props<{ searchResults: GithubSearchUserResult; error: any }>()
);

const dummy: GithubUser[] = [
  {
    login: 'ninad',
    id: 124138,
    node_id: 'MDQ6VXNlcjEyNDEzOA==',
    avatar_url: 'https://avatars.githubusercontent.com/u/124138?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninad',
    html_url: 'https://github.com/ninad',
    followers_url: 'https://api.github.com/users/ninad/followers',
    following_url: 'https://api.github.com/users/ninad/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninad/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/ninad/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninad/subscriptions',
    organizations_url: 'https://api.github.com/users/ninad/orgs',
    repos_url: 'https://api.github.com/users/ninad/repos',
    events_url: 'https://api.github.com/users/ninad/events{/privacy}',
    received_events_url: 'https://api.github.com/users/ninad/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadingole',
    id: 1947050,
    node_id: 'MDQ6VXNlcjE5NDcwNTA=',
    avatar_url: 'https://avatars.githubusercontent.com/u/1947050?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadingole',
    html_url: 'https://github.com/ninadingole',
    followers_url: 'https://api.github.com/users/ninadingole/followers',
    following_url:
      'https://api.github.com/users/ninadingole/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadingole/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninadingole/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninadingole/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadingole/orgs',
    repos_url: 'https://api.github.com/users/ninadingole/repos',
    events_url: 'https://api.github.com/users/ninadingole/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninadingole/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadpchaudhari',
    id: 1305825,
    node_id: 'MDQ6VXNlcjEzMDU4MjU=',
    avatar_url: 'https://avatars.githubusercontent.com/u/1305825?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadpchaudhari',
    html_url: 'https://github.com/ninadpchaudhari',
    followers_url: 'https://api.github.com/users/ninadpchaudhari/followers',
    following_url:
      'https://api.github.com/users/ninadpchaudhari/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadpchaudhari/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninadpchaudhari/starred{/owner}{/repo}',
    subscriptions_url:
      'https://api.github.com/users/ninadpchaudhari/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadpchaudhari/orgs',
    repos_url: 'https://api.github.com/users/ninadpchaudhari/repos',
    events_url: 'https://api.github.com/users/ninadpchaudhari/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninadpchaudhari/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'NinadHora',
    id: 62748492,
    node_id: 'MDQ6VXNlcjYyNzQ4NDky',
    avatar_url: 'https://avatars.githubusercontent.com/u/62748492?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/NinadHora',
    html_url: 'https://github.com/NinadHora',
    followers_url: 'https://api.github.com/users/NinadHora/followers',
    following_url:
      'https://api.github.com/users/NinadHora/following{/other_user}',
    gists_url: 'https://api.github.com/users/NinadHora/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/NinadHora/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/NinadHora/subscriptions',
    organizations_url: 'https://api.github.com/users/NinadHora/orgs',
    repos_url: 'https://api.github.com/users/NinadHora/repos',
    events_url: 'https://api.github.com/users/NinadHora/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/NinadHora/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadhatkar',
    id: 832023,
    node_id: 'MDQ6VXNlcjgzMjAyMw==',
    avatar_url: 'https://avatars.githubusercontent.com/u/832023?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadhatkar',
    html_url: 'https://github.com/ninadhatkar',
    followers_url: 'https://api.github.com/users/ninadhatkar/followers',
    following_url:
      'https://api.github.com/users/ninadhatkar/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadhatkar/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninadhatkar/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninadhatkar/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadhatkar/orgs',
    repos_url: 'https://api.github.com/users/ninadhatkar/repos',
    events_url: 'https://api.github.com/users/ninadhatkar/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninadhatkar/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadakolekar',
    id: 5893703,
    node_id: 'MDQ6VXNlcjU4OTM3MDM=',
    avatar_url: 'https://avatars.githubusercontent.com/u/5893703?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadakolekar',
    html_url: 'https://github.com/ninadakolekar',
    followers_url: 'https://api.github.com/users/ninadakolekar/followers',
    following_url:
      'https://api.github.com/users/ninadakolekar/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadakolekar/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninadakolekar/starred{/owner}{/repo}',
    subscriptions_url:
      'https://api.github.com/users/ninadakolekar/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadakolekar/orgs',
    repos_url: 'https://api.github.com/users/ninadakolekar/repos',
    events_url: 'https://api.github.com/users/ninadakolekar/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninadakolekar/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadsp',
    id: 240333,
    node_id: 'MDQ6VXNlcjI0MDMzMw==',
    avatar_url: 'https://avatars.githubusercontent.com/u/240333?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadsp',
    html_url: 'https://github.com/ninadsp',
    followers_url: 'https://api.github.com/users/ninadsp/followers',
    following_url:
      'https://api.github.com/users/ninadsp/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadsp/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/ninadsp/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninadsp/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadsp/orgs',
    repos_url: 'https://api.github.com/users/ninadsp/repos',
    events_url: 'https://api.github.com/users/ninadsp/events{/privacy}',
    received_events_url: 'https://api.github.com/users/ninadsp/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'Ninad99',
    id: 39592667,
    node_id: 'MDQ6VXNlcjM5NTkyNjY3',
    avatar_url: 'https://avatars.githubusercontent.com/u/39592667?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/Ninad99',
    html_url: 'https://github.com/Ninad99',
    followers_url: 'https://api.github.com/users/Ninad99/followers',
    following_url:
      'https://api.github.com/users/Ninad99/following{/other_user}',
    gists_url: 'https://api.github.com/users/Ninad99/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/Ninad99/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/Ninad99/subscriptions',
    organizations_url: 'https://api.github.com/users/Ninad99/orgs',
    repos_url: 'https://api.github.com/users/Ninad99/repos',
    events_url: 'https://api.github.com/users/Ninad99/events{/privacy}',
    received_events_url: 'https://api.github.com/users/Ninad99/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'NinaDang97',
    id: 31354481,
    node_id: 'MDQ6VXNlcjMxMzU0NDgx',
    avatar_url: 'https://avatars.githubusercontent.com/u/31354481?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/NinaDang97',
    html_url: 'https://github.com/NinaDang97',
    followers_url: 'https://api.github.com/users/NinaDang97/followers',
    following_url:
      'https://api.github.com/users/NinaDang97/following{/other_user}',
    gists_url: 'https://api.github.com/users/NinaDang97/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/NinaDang97/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/NinaDang97/subscriptions',
    organizations_url: 'https://api.github.com/users/NinaDang97/orgs',
    repos_url: 'https://api.github.com/users/NinaDang97/repos',
    events_url: 'https://api.github.com/users/NinaDang97/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/NinaDang97/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'NINadjem',
    id: 47980833,
    node_id: 'MDQ6VXNlcjQ3OTgwODMz',
    avatar_url: 'https://avatars.githubusercontent.com/u/47980833?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/NINadjem',
    html_url: 'https://github.com/NINadjem',
    followers_url: 'https://api.github.com/users/NINadjem/followers',
    following_url:
      'https://api.github.com/users/NINadjem/following{/other_user}',
    gists_url: 'https://api.github.com/users/NINadjem/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/NINadjem/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/NINadjem/subscriptions',
    organizations_url: 'https://api.github.com/users/NINadjem/orgs',
    repos_url: 'https://api.github.com/users/NINadjem/repos',
    events_url: 'https://api.github.com/users/NINadjem/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/NINadjem/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'nindate',
    id: 7146317,
    node_id: 'MDQ6VXNlcjcxNDYzMTc=',
    avatar_url: 'https://avatars.githubusercontent.com/u/7146317?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/nindate',
    html_url: 'https://github.com/nindate',
    followers_url: 'https://api.github.com/users/nindate/followers',
    following_url:
      'https://api.github.com/users/nindate/following{/other_user}',
    gists_url: 'https://api.github.com/users/nindate/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/nindate/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/nindate/subscriptions',
    organizations_url: 'https://api.github.com/users/nindate/orgs',
    repos_url: 'https://api.github.com/users/nindate/repos',
    events_url: 'https://api.github.com/users/nindate/events{/privacy}',
    received_events_url: 'https://api.github.com/users/nindate/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninja3011',
    id: 51434707,
    node_id: 'MDQ6VXNlcjUxNDM0NzA3',
    avatar_url: 'https://avatars.githubusercontent.com/u/51434707?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninja3011',
    html_url: 'https://github.com/ninja3011',
    followers_url: 'https://api.github.com/users/ninja3011/followers',
    following_url:
      'https://api.github.com/users/ninja3011/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninja3011/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninja3011/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninja3011/subscriptions',
    organizations_url: 'https://api.github.com/users/ninja3011/orgs',
    repos_url: 'https://api.github.com/users/ninja3011/repos',
    events_url: 'https://api.github.com/users/ninja3011/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninja3011/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadchilap',
    id: 2188680,
    node_id: 'MDQ6VXNlcjIxODg2ODA=',
    avatar_url: 'https://avatars.githubusercontent.com/u/2188680?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadchilap',
    html_url: 'https://github.com/ninadchilap',
    followers_url: 'https://api.github.com/users/ninadchilap/followers',
    following_url:
      'https://api.github.com/users/ninadchilap/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadchilap/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninadchilap/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninadchilap/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadchilap/orgs',
    repos_url: 'https://api.github.com/users/ninadchilap/repos',
    events_url: 'https://api.github.com/users/ninadchilap/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninadchilap/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'FalconMadhab',
    id: 32309032,
    node_id: 'MDQ6VXNlcjMyMzA5MDMy',
    avatar_url: 'https://avatars.githubusercontent.com/u/32309032?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/FalconMadhab',
    html_url: 'https://github.com/FalconMadhab',
    followers_url: 'https://api.github.com/users/FalconMadhab/followers',
    following_url:
      'https://api.github.com/users/FalconMadhab/following{/other_user}',
    gists_url: 'https://api.github.com/users/FalconMadhab/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/FalconMadhab/starred{/owner}{/repo}',
    subscriptions_url:
      'https://api.github.com/users/FalconMadhab/subscriptions',
    organizations_url: 'https://api.github.com/users/FalconMadhab/orgs',
    repos_url: 'https://api.github.com/users/FalconMadhab/repos',
    events_url: 'https://api.github.com/users/FalconMadhab/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/FalconMadhab/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninad458',
    id: 33372604,
    node_id: 'MDQ6VXNlcjMzMzcyNjA0',
    avatar_url: 'https://avatars.githubusercontent.com/u/33372604?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninad458',
    html_url: 'https://github.com/ninad458',
    followers_url: 'https://api.github.com/users/ninad458/followers',
    following_url:
      'https://api.github.com/users/ninad458/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninad458/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/ninad458/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninad458/subscriptions',
    organizations_url: 'https://api.github.com/users/ninad458/orgs',
    repos_url: 'https://api.github.com/users/ninad458/repos',
    events_url: 'https://api.github.com/users/ninad458/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninad458/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninad1999',
    id: 34257987,
    node_id: 'MDQ6VXNlcjM0MjU3OTg3',
    avatar_url: 'https://avatars.githubusercontent.com/u/34257987?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninad1999',
    html_url: 'https://github.com/ninad1999',
    followers_url: 'https://api.github.com/users/ninad1999/followers',
    following_url:
      'https://api.github.com/users/ninad1999/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninad1999/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninad1999/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninad1999/subscriptions',
    organizations_url: 'https://api.github.com/users/ninad1999/orgs',
    repos_url: 'https://api.github.com/users/ninad1999/repos',
    events_url: 'https://api.github.com/users/ninad1999/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninad1999/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'NinadKanchan',
    id: 56508313,
    node_id: 'MDQ6VXNlcjU2NTA4MzEz',
    avatar_url: 'https://avatars.githubusercontent.com/u/56508313?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/NinadKanchan',
    html_url: 'https://github.com/NinadKanchan',
    followers_url: 'https://api.github.com/users/NinadKanchan/followers',
    following_url:
      'https://api.github.com/users/NinadKanchan/following{/other_user}',
    gists_url: 'https://api.github.com/users/NinadKanchan/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/NinadKanchan/starred{/owner}{/repo}',
    subscriptions_url:
      'https://api.github.com/users/NinadKanchan/subscriptions',
    organizations_url: 'https://api.github.com/users/NinadKanchan/orgs',
    repos_url: 'https://api.github.com/users/NinadKanchan/repos',
    events_url: 'https://api.github.com/users/NinadKanchan/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/NinadKanchan/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadkgaikwad',
    id: 12859330,
    node_id: 'MDQ6VXNlcjEyODU5MzMw',
    avatar_url: 'https://avatars.githubusercontent.com/u/12859330?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadkgaikwad',
    html_url: 'https://github.com/ninadkgaikwad',
    followers_url: 'https://api.github.com/users/ninadkgaikwad/followers',
    following_url:
      'https://api.github.com/users/ninadkgaikwad/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadkgaikwad/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninadkgaikwad/starred{/owner}{/repo}',
    subscriptions_url:
      'https://api.github.com/users/ninadkgaikwad/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadkgaikwad/orgs',
    repos_url: 'https://api.github.com/users/ninadkgaikwad/repos',
    events_url: 'https://api.github.com/users/ninadkgaikwad/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninadkgaikwad/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadchavan',
    id: 42689621,
    node_id: 'MDQ6VXNlcjQyNjg5NjIx',
    avatar_url: 'https://avatars.githubusercontent.com/u/42689621?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadchavan',
    html_url: 'https://github.com/ninadchavan',
    followers_url: 'https://api.github.com/users/ninadchavan/followers',
    following_url:
      'https://api.github.com/users/ninadchavan/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadchavan/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninadchavan/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninadchavan/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadchavan/orgs',
    repos_url: 'https://api.github.com/users/ninadchavan/repos',
    events_url: 'https://api.github.com/users/ninadchavan/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninadchavan/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadpatil1452',
    id: 70624362,
    node_id: 'MDQ6VXNlcjcwNjI0MzYy',
    avatar_url: 'https://avatars.githubusercontent.com/u/70624362?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadpatil1452',
    html_url: 'https://github.com/ninadpatil1452',
    followers_url: 'https://api.github.com/users/ninadpatil1452/followers',
    following_url:
      'https://api.github.com/users/ninadpatil1452/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadpatil1452/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninadpatil1452/starred{/owner}{/repo}',
    subscriptions_url:
      'https://api.github.com/users/ninadpatil1452/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadpatil1452/orgs',
    repos_url: 'https://api.github.com/users/ninadpatil1452/repos',
    events_url: 'https://api.github.com/users/ninadpatil1452/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninadpatil1452/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadmg',
    id: 3727381,
    node_id: 'MDQ6VXNlcjM3MjczODE=',
    avatar_url: 'https://avatars.githubusercontent.com/u/3727381?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadmg',
    html_url: 'https://github.com/ninadmg',
    followers_url: 'https://api.github.com/users/ninadmg/followers',
    following_url:
      'https://api.github.com/users/ninadmg/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadmg/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/ninadmg/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninadmg/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadmg/orgs',
    repos_url: 'https://api.github.com/users/ninadmg/repos',
    events_url: 'https://api.github.com/users/ninadmg/events{/privacy}',
    received_events_url: 'https://api.github.com/users/ninadmg/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'Hacker22o2',
    id: 33136022,
    node_id: 'MDQ6VXNlcjMzMTM2MDIy',
    avatar_url: 'https://avatars.githubusercontent.com/u/33136022?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/Hacker22o2',
    html_url: 'https://github.com/Hacker22o2',
    followers_url: 'https://api.github.com/users/Hacker22o2/followers',
    following_url:
      'https://api.github.com/users/Hacker22o2/following{/other_user}',
    gists_url: 'https://api.github.com/users/Hacker22o2/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/Hacker22o2/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/Hacker22o2/subscriptions',
    organizations_url: 'https://api.github.com/users/Hacker22o2/orgs',
    repos_url: 'https://api.github.com/users/Hacker22o2/repos',
    events_url: 'https://api.github.com/users/Hacker22o2/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/Hacker22o2/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'PainKiller3',
    id: 18658422,
    node_id: 'MDQ6VXNlcjE4NjU4NDIy',
    avatar_url: 'https://avatars.githubusercontent.com/u/18658422?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/PainKiller3',
    html_url: 'https://github.com/PainKiller3',
    followers_url: 'https://api.github.com/users/PainKiller3/followers',
    following_url:
      'https://api.github.com/users/PainKiller3/following{/other_user}',
    gists_url: 'https://api.github.com/users/PainKiller3/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/PainKiller3/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/PainKiller3/subscriptions',
    organizations_url: 'https://api.github.com/users/PainKiller3/orgs',
    repos_url: 'https://api.github.com/users/PainKiller3/repos',
    events_url: 'https://api.github.com/users/PainKiller3/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/PainKiller3/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'NinadRao0707',
    id: 67018142,
    node_id: 'MDQ6VXNlcjY3MDE4MTQy',
    avatar_url: 'https://avatars.githubusercontent.com/u/67018142?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/NinadRao0707',
    html_url: 'https://github.com/NinadRao0707',
    followers_url: 'https://api.github.com/users/NinadRao0707/followers',
    following_url:
      'https://api.github.com/users/NinadRao0707/following{/other_user}',
    gists_url: 'https://api.github.com/users/NinadRao0707/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/NinadRao0707/starred{/owner}{/repo}',
    subscriptions_url:
      'https://api.github.com/users/NinadRao0707/subscriptions',
    organizations_url: 'https://api.github.com/users/NinadRao0707/orgs',
    repos_url: 'https://api.github.com/users/NinadRao0707/repos',
    events_url: 'https://api.github.com/users/NinadRao0707/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/NinadRao0707/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadicara',
    id: 44364127,
    node_id: 'MDQ6VXNlcjQ0MzY0MTI3',
    avatar_url: 'https://avatars.githubusercontent.com/u/44364127?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadicara',
    html_url: 'https://github.com/ninadicara',
    followers_url: 'https://api.github.com/users/ninadicara/followers',
    following_url:
      'https://api.github.com/users/ninadicara/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadicara/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninadicara/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninadicara/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadicara/orgs',
    repos_url: 'https://api.github.com/users/ninadicara/repos',
    events_url: 'https://api.github.com/users/ninadicara/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninadicara/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadsumant',
    id: 44379598,
    node_id: 'MDQ6VXNlcjQ0Mzc5NTk4',
    avatar_url: 'https://avatars.githubusercontent.com/u/44379598?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadsumant',
    html_url: 'https://github.com/ninadsumant',
    followers_url: 'https://api.github.com/users/ninadsumant/followers',
    following_url:
      'https://api.github.com/users/ninadsumant/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadsumant/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninadsumant/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninadsumant/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadsumant/orgs',
    repos_url: 'https://api.github.com/users/ninadsumant/repos',
    events_url: 'https://api.github.com/users/ninadsumant/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninadsumant/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadk1092',
    id: 4184469,
    node_id: 'MDQ6VXNlcjQxODQ0Njk=',
    avatar_url: 'https://avatars.githubusercontent.com/u/4184469?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadk1092',
    html_url: 'https://github.com/ninadk1092',
    followers_url: 'https://api.github.com/users/ninadk1092/followers',
    following_url:
      'https://api.github.com/users/ninadk1092/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadk1092/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninadk1092/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninadk1092/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadk1092/orgs',
    repos_url: 'https://api.github.com/users/ninadk1092/repos',
    events_url: 'https://api.github.com/users/ninadk1092/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninadk1092/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadvadujkar',
    id: 24488614,
    node_id: 'MDQ6VXNlcjI0NDg4NjE0',
    avatar_url: 'https://avatars.githubusercontent.com/u/24488614?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadvadujkar',
    html_url: 'https://github.com/ninadvadujkar',
    followers_url: 'https://api.github.com/users/ninadvadujkar/followers',
    following_url:
      'https://api.github.com/users/ninadvadujkar/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadvadujkar/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninadvadujkar/starred{/owner}{/repo}',
    subscriptions_url:
      'https://api.github.com/users/ninadvadujkar/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadvadujkar/orgs',
    repos_url: 'https://api.github.com/users/ninadvadujkar/repos',
    events_url: 'https://api.github.com/users/ninadvadujkar/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninadvadujkar/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'ninadfrenzy',
    id: 32587826,
    node_id: 'MDQ6VXNlcjMyNTg3ODI2',
    avatar_url: 'https://avatars.githubusercontent.com/u/32587826?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ninadfrenzy',
    html_url: 'https://github.com/ninadfrenzy',
    followers_url: 'https://api.github.com/users/ninadfrenzy/followers',
    following_url:
      'https://api.github.com/users/ninadfrenzy/following{/other_user}',
    gists_url: 'https://api.github.com/users/ninadfrenzy/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/ninadfrenzy/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ninadfrenzy/subscriptions',
    organizations_url: 'https://api.github.com/users/ninadfrenzy/orgs',
    repos_url: 'https://api.github.com/users/ninadfrenzy/repos',
    events_url: 'https://api.github.com/users/ninadfrenzy/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/ninadfrenzy/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
  {
    login: 'Ninkuk',
    id: 20276256,
    node_id: 'MDQ6VXNlcjIwMjc2MjU2',
    avatar_url: 'https://avatars.githubusercontent.com/u/20276256?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/Ninkuk',
    html_url: 'https://github.com/Ninkuk',
    followers_url: 'https://api.github.com/users/Ninkuk/followers',
    following_url: 'https://api.github.com/users/Ninkuk/following{/other_user}',
    gists_url: 'https://api.github.com/users/Ninkuk/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/Ninkuk/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/Ninkuk/subscriptions',
    organizations_url: 'https://api.github.com/users/Ninkuk/orgs',
    repos_url: 'https://api.github.com/users/Ninkuk/repos',
    events_url: 'https://api.github.com/users/Ninkuk/events{/privacy}',
    received_events_url: 'https://api.github.com/users/Ninkuk/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0,
  },
];

export const initialState = {
  isAppLoading: false,
  isDeletiongInProgress: false,
  searchText: '',
  searchResults: [], // dummy,//[],
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
      searchResults:[],
      isSearching: false,
      error: null,
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
