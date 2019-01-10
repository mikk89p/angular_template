import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  // Observables Finnish notation
  private currentUser$: BehaviorSubject<User>;


  constructor(private http: HttpClient) {
    let user = null;
    // user = (new User(5, 'John', 'asd@asd.ee', '3rf4rwfewfdsfsdfsdf4trwfwefe'));
    if (localStorage.getItem('currentUser')) {
      user = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.currentUser$ = new BehaviorSubject<User>(user);
  }

  public get currentUserValue(): User {
    return this.currentUser$.value;
  }

  public getCurrentUser() {
    return this.currentUser$;
  }

  // AuthenticationService after login sends data
  public setCurrentUser(user: User) {

    if (user === null) {
      localStorage.removeItem('currentUser');
    } else {
      // store user details and token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUser$.next(user);
  }


  register(username: string, email: string, password: string) {
    return this.http.post<any>(this.apiUrl + '/user/register', { username, email, password }).pipe(tap(
      response => {
        return response.data;
      },
      error => {
        return error.data;
      },

    ));

  }
  update(fields) {
    const body = JSON.stringify(fields);
    console.log(fields);
    return this.http.patch<any>(this.apiUrl + '/user/update', body, this.httpOptions).pipe(tap(
      response => {
        return response['data'];
      },
      error => {
        return error.data;
      },
    ));
  }

  forgotpassword(email) {
    return this.http.post<any>(this.apiUrl + '/user/forgotpassword', { email }).pipe(tap(
      response => {
        return response.data;
      },
      error => {
        return error.data;
      },

    ));

  }
}
