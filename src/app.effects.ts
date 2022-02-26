import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  catchError,
  switchMap,
  map,
  delay,
  filter,
  take,
  startWith,
} from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  AppState,
  GithubSearchUserResult,
  initializeAppComplete,
  RecentEntry,
  search,
  searchCompleted,
  recents,
  clearRecentsCompleted,
} from './app.store';

@Injectable()
export class AppEffects {
  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private githubService: GithubService,
    private storageService: StorageService
  ) {
    this.actions$.subscribe(console.log);
  }

  initApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Initialize app'),
      switchMap((payload) => {
        return this.storageService.getRecents().pipe(
          map((recents) => initializeAppComplete({ recents })),
          catchError((err) => of(initializeAppComplete({ recents: [] })))
        );
      })
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Search'),
      filter((payload: any) => payload.searchText),
      switchMap((payload: any) => {
        return this.githubService.getUsers(payload.searchText).pipe(
          map((res) => searchCompleted({ searchResults: res, error: null })),
          catchError((err) =>
            of(searchCompleted({ searchResults: null, error: err }))
          )
        );
      })
    )
  );

  saveRecents$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType('[App] Search Completed'),
        switchMap((payload) => this.store$.pipe(select(recents), take(1))),
        map((recents) => this.storageService.saveRecents(recents))
      ),
    { dispatch: false }
  );

  // clearRecents$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType('[App] Clear recents'),
  //     switchMap((payload: any) => {
  //       this.storageService.saveRecents([]);
  //       return of(clearRecentsCompleted());
  //     })
  //   )
  // );
}

@Injectable()
export class GithubService {
  constructor(private http: HttpClient) {}

  getUsers(text: string): Observable<GithubSearchUserResult> {
    return this.http.get<GithubSearchUserResult>(
      `https://api.github.com/search/users?q=${text}+in:user`
    );
  }
}

@Injectable()
export class StorageService {
  key: string = 'github_recents';

  getRecents(): Observable<RecentEntry[]> {
    let recents = localStorage.getItem(this.key);
    return of(JSON.parse(recents));
  }

  saveRecents(recents: RecentEntry[]) {
    console.log('Saving recents');
    localStorage.setItem(this.key, JSON.stringify(recents));
  }
}
