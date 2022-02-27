import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, filter } from 'rxjs/operators';
import {
  AppState,
  GithubUser,
  isSearching,
  searchText,
  searchResults,
  error,
  search,
  clearSearch,
} from '../../app.store';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  isComponentAlive$ = new Subject<void>();
  searchText: string = '';

  isSearching$: Observable<boolean> = this.store.pipe(select(isSearching));
  searchText$: Observable<string> = this.store.pipe(select(searchText));
  searchResults$: Observable<GithubUser[]> = this.store.pipe(
    select(searchResults)
  );
  error$: Observable<string> = this.store.pipe(select(error));

  constructor(
    private store: Store<AppState>,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.searchText$
    //   .pipe(takeUntil(this.isComponentAlive$))
    //   .subscribe((t) => (this.searchText = t));

    const routeParam$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('username')),
      takeUntil(this.isComponentAlive$)
    );

    routeParam$.subscribe((txt) => {
      this.searchText = txt;
      if (txt && txt.length !== 0) {
        this.store.dispatch(search({ searchText: txt.trim() }));
      } else {
        this.store.dispatch(clearSearch());
      }
    });
  }

  ngOnDestroy() {
    this.isComponentAlive$.next();
    this.isComponentAlive$.complete();
  }

  submitSearch() {
    console.log(this.searchText);
    //this.store.dispatch(search({ searchText: this.searchText.trim() }));
    this.router.navigate(['search', this.searchText]);
  }

  navigateToProfile(url: string) {
    this.document.defaultView.open(url, '_blank');
  }

  search(text: string) {
    this.searchText = text;
    this.store.dispatch(search({ searchText: text }));
  }
}
