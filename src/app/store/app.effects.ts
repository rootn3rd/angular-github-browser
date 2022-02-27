import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { catchError, switchMap, map, filter, take } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { GithubService, StorageService } from '../services';
import {
  initializeAppComplete,
  searchCompleted,
  clearRecentsCompleted,
} from './app.actions';

import { AppState } from './app.models';
import { recents } from './app.selectors';

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
        ofType(...['[App] Search Completed', '[App] Remove recent']),
        switchMap((payload) => this.store$.pipe(select(recents), take(1))),
        map((recents) => this.storageService.saveRecents(recents))
      ),
    { dispatch: false }
  );

  clearRecents$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Clear recents'),
      switchMap((payload: any) => {
        this.storageService.saveRecents([]);
        return of(clearRecentsCompleted());
      })
    )
  );
}
