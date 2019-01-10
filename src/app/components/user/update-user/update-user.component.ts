import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../../../models/user';

// Services
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../translations/translate.pipe';

// Helpers
import { FormHelper } from '../../../_helpers/form.helper';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  // User
  userSubscription: Subscription;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private translatePipe: TranslatePipe,
    private formHelper: FormHelper,
  ) { }

  // When a component/directive is destroyed, all custom Observables need to be unsubscribed manually
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
      current_password: ['', Validators.required],
      new_password: ['', Validators.minLength(8)]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // Get current user
    this.userSubscription = this.userService.getCurrentUser().subscribe(
      user => {
        if (user) {
          // TODO Map
          this.user = user;
          this.formControls.username.setValue(user.username);
          this.formControls.email.setValue(user.email);
        }
      }
    );
  }

  // convenience getter for easy access to form fields
  get formControls() { return this.form.controls; }

  getErrorMessage(field: string) {
    return this.formHelper.getErrorMessage(this.formControls, field);
  }

  onSubmit() {

    this.submitted = true;

    if (this.form.invalid) {
      this.alertService.error('Check inputs');
      return;
    }

    this.loading = true;

    this.userService.update({
      'email': this.formControls.email.value,
      'username': this.formControls.username.value,
      'current_password': this.formControls.current_password.value,
      'new_password': this.formControls.new_password.value

    })
      .pipe(first())
      .subscribe(

        res => {
          // TODO set user new values
          this.handleSubmitSuccess(res);
        },
        error => this.handleSubmitError(error));
  }

  protected handleSubmitSuccess(res: any) {
    this.alertService.success(this.translatePipe.transform(res.data), 3000, true);
    this.router.navigate([this.returnUrl]);
  }

  protected handleSubmitError(error: any) {

    this.loading = false;
    this.formHelper.handleSubmitError(this.formControls, error);
    this.alertService.error(this.translatePipe.transform('error.update.failed'));
  }

}

