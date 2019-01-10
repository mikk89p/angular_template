import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

// Services
import { AuthenticationService } from '../../../services/authentication.service';
import { AlertService } from '../../../services/alert.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authenticationService.logout().subscribe(
      data => {
        console.log('User is logged out');
      },
      error => {
        if (error.message) {
          this.alertService.error(error.message);
        } else {
          this.alertService.error(error);
        }

      },
      () => { this.router.navigate(['/']); }
    );
  }

}
