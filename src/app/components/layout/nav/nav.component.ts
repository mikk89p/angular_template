import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from 'node_modules/@angular/router';
import { Subscription } from 'rxjs';

// Model
import { User } from '../../../models/user';


// Services
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit() {
    this.currentUserSubscription = this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

}
