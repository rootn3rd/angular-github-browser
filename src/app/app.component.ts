import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.models';
import { initializeApp } from './store/app.actions';

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
