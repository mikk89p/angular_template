import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { BehaviorSubject, forkJoin, ReplaySubject, Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AlertService {

  // Observables Finnish notation
  public alert$;


  private keepAfterNavigationChange = false;

  constructor(private router: Router) {

    this.alert$ = new ReplaySubject<any>(1);

    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.alert$.next();
        }
      }
    });
  }

  success(message: string, duration: number = 2000, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.alert$.next({ type: 'success', text: message, duration: duration });
  }

  error(message: string, duration: number = 2000, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.alert$.next({ type: 'error', text: message, duration: duration });
  }

  removeAlert() {
    this.alert$.next();
  }

  getMessage() {
    return this.alert$;
  }
}
