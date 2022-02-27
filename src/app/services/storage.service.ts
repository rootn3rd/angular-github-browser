import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RecentEntry } from '../store/app.models';

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
