import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

// Services
import { AlertService } from '../../../services/alert.service';
import { UserService } from '../../../services/user.service';

// Models
import { User } from '../../../models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  title: String = 'template';
  tokenName = environment.tokenName;
  games;

  currentUser: User;
  currentUserSubscription: Subscription;
  gamesSubscription: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.currentUserSubscription = this.userService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
      });


  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

}
