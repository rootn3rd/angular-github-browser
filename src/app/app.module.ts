import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { appReducer } from './store/app.reducer';
import { AppEffects } from './store/app.effects';
import { GithubService, StorageService } from './services';

import { SearchComponent } from './search/search.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'search/:username', component: SearchComponent },
      { path: 'search', component: SearchComponent },
      { path: 'history', component: HistoryComponent },
      { path: '**', redirectTo: '/history', pathMatch: 'full' },
    ]),
    StoreModule.forRoot({
      search: appReducer,
    }),
    EffectsModule.forRoot([AppEffects]),
  ],

  providers: [GithubService, StorageService],
  declarations: [AppComponent, SearchComponent, HistoryComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
