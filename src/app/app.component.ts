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
} from '../app.store';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  searchText: string = '';

  isSearching$: Observable<boolean> = this.store.pipe(select(isSearching));
  searchText$: Observable<string> = this.store.pipe(select(searchText));
  searchResults$: Observable<GithubUser[]> = this.store.pipe(
    select(searchResults)
  );
  error$: Observable<string> = this.store.pipe(select(error));

  recents$: Observable<RecentEntry[]> = this.store.pipe(select(recents));

  constructor(
    private store: Store<AppState>,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.store.dispatch(initializeApp());
  }
  submitSearch() {
    console.log(this.searchText);
    this.store.dispatch(search({ searchText: this.searchText.trim() }));
  }

  navigateToProfile(url: string) {
    this.document.defaultView.open(url, '_blank');
  }

  search(text: string) {
    this.searchText = text;
    this.store.dispatch(search({ searchText: text }));
  }
}
