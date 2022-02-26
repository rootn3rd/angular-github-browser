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
import { Router } from '@angular/router';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  recents$: Observable<RecentEntry[]> = this.store.pipe(select(recents));

  constructor(private store: Store<AppState>, private router: Router) {}

  search(text: string) {
    this.store.dispatch(search({ searchText: text }));
    this.router.navigate(['search']);
  }

  clearAllRecents() {
    this.store.dispatch(clearRecents());
  }

  removeRecent(recent: RecentEntry) {
    this.store.dispatch(removeRecent({ recentEntry: recent }));
  }
}
