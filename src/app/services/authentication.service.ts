import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { User } from '../models/user';
import { TranslatePipe } from '../translations/translate.pipe';

// Serivces
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  apiUrl = environment.apiUrl;
  tokenName = environment.tokenName;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private alertService: AlertService,
    private translatePipe: TranslatePipe,
  ) {
  }

  login(login: string, password: string) {
    return this.http.post<any>(this.apiUrl + '/user/login', { login, password }).pipe(tap(
      response => {
        // No need to check success, only if 200
        if (response.success) {
          const user: User = new User(
            response.data.id,
            response.data.username,
            response.data.email,
            response.data.token,
          );
          this.userService.setCurrentUser(user);
        }
        return response.data;
      },

      error => {
        return error;
      },

    ));

  }

  logout() {
    if (this.userService.currentUserValue !== null) {
      const token = this.userService.currentUserValue.token;
      // TODO
      return this.http.post<any>(this.apiUrl + '/user/logout', { token }).pipe(tap(response => {
        if (response['success'] === true) {
          this.userService.setCurrentUser(null);
          this.alertService.success(this.translatePipe.transform('Logout succesful'), 1000, true);
        }
      }
      ));
    }
  }

}
