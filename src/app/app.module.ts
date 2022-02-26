import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { StoreModule } from '@ngrx/store/src';
import { EffectsModule } from '@ngrx/effects/src';
import { appReducer } from '../app.store';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({
      search: appReducer,
    }),
    EffectsModule.forRoot([]),
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
