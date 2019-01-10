import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from 'node_modules/@angular/router';
import { TranslatePipe } from '../translations/translate.pipe';


// Services
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
/*
The Error Interceptor intercepts http responses from the api to check if there were any errors.
 If there is a 401 Unauthorized response the user is automatically logged out of the application,
 all other errors are re-thrown up to the calling service so an alert can be displayed to the user.
*/




@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  returnUrl = '/';


  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService,
    private translatePipe: TranslatePipe) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 && this.router.url !== '/login') {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        this.alertService.success(this.translatePipe.transform('Access denied'), 3000, true);
        this.router.navigate([this.returnUrl]);
      }

      const error = err.error.data || err.statusText;
      return throwError(error);
    }));
  }
}
