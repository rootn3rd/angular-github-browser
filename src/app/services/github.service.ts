import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { GithubSearchUserResult } from '../store/app.models';

@Injectable()
export class GithubService {
  constructor(private http: HttpClient) {}

  getUsers(text: string): Observable<GithubSearchUserResult> {
    return this.http.get<GithubSearchUserResult>(
      `https://api.github.com/search/users?q=${text}+in:user`
    );
  }
}
