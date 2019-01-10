import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { AlertService } from '../../services/alert.service';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html'
})


// The alert component passes alert messages to the template whenever a message is received from the alert service. 
// It does this by subscribing to the alert service's getMessage() method which returns an Observable.
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;
  type: any;

  constructor(private alertService: AlertService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(
      response => {
        if (response !== undefined) {
          this.message = response.text;
          this.type = response.type;
          this.openSnackBar(response.text, response.duration);
        } else {
          // if undefined then dismiss
          this.dismissSnackBar();
        }
      }, error => {
        this.openSnackBar(error, 2000);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openSnackBar(message, duration) {
    this.snackBar.openFromComponent(SnackComponent, {
      duration: duration,
      data: message,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

  }

  dismissSnackBar() {
    this.snackBar.dismiss();
  }
}

@Component({
  selector: 'app-snack',
  templateUrl: 'snack.component.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class SnackComponent {
  message;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data;
  }
}
