import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AppState,
  GithubUser,
  isSearching,
  searchText,
  searchResults,
  error,
  search,
} from '../../app.store';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchText: string = '';

  isSearching$: Observable<boolean> = this.store.pipe(select(isSearching));
  searchText$: Observable<string> = this.store.pipe(select(searchText));
  searchResults$: Observable<GithubUser[]> = this.store.pipe(
    select(searchResults)
  );
  error$: Observable<string> = this.store.pipe(select(error));

  constructor(
    private store: Store<AppState>,
    @Inject(DOCUMENT) private document: Document
  ) {}

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
