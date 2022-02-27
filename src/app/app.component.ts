import { Component, VERSION, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  AppState,
  GithubUser,
  isSearching,
  searchText,
  searchResults,
  error,
  search,
  searchCompleted,
  RecentEntry,
  recents,
  initializeApp,
  clearRecents,
  removeRecent,
} from '../app.store';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(initializeApp());
  }
}
