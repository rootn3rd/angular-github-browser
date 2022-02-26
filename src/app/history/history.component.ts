import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AppState,
  RecentEntry,
  GithubUser,
  isSearching,
  searchText,
  searchResults,
  error,
  search,
  recents,
  clearRecents,
  removeRecent,
} from '../../app.store';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  recents$: Observable<RecentEntry[]> = this.store.pipe(select(recents));

  constructor(
    private store: Store<AppState>,
    @Inject(DOCUMENT) private document: Document
  ) {}

  search(text: string) {
    //  this.searchText = text;
    this.store.dispatch(search({ searchText: text }));
  }

  clearAllRecents() {
    this.store.dispatch(clearRecents());
  }

  removeRecent(recent: RecentEntry) {
    this.store.dispatch(removeRecent({ recentEntry: recent }));
  }
}