import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Services
// import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

/*
The auth guard is used to prevent unauthenticated users from accessing restricted routes,
in this example it's used in app.routing.ts to protect the home page route.
For more information about angular 2+ route guards you can check out this post on the thoughtram blog.
*/

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.userService.currentUserValue;
    if (currentUser) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
