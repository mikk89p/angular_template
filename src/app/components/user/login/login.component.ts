import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TranslatePipe } from '../../../translations/translate.pipe';

// Services
import { AuthenticationService } from '../../../services/authentication.service';
import { AlertService } from '../../../services/alert.service';

// Helpers
import { FormHelper } from '../../../_helpers/form.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private translatePipe: TranslatePipe,
    private formHelper: FormHelper,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['mikk', [Validators.required, Validators.minLength(3)]],
      password: ['asdfasdf', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy() { }

  // convenience getter for easy access to form fields
  get formControls() { return this.form.controls; }

  getErrorMessage(field: string) {
    return this.formHelper.getErrorMessage(this.formControls, field);
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.alertService.error(this.translatePipe.transform('form.error.inputs'));
      return;
    }

    this.loading = true;
    this.authenticationService.login(
      this.formControls.username.value,
      this.formControls.password.value)
      .pipe(first())
      .subscribe(
        res => this.handleSubmitSuccess(res),
        error => this.handleSubmitError(error)
      );
  }

  protected handleSubmitSuccess(res: any) {
    this.alertService.success(this.translatePipe.transform('Welcome') + ' ' + res.data.username, 1000, true);
    this.router.navigate([this.returnUrl]);
  }

  protected handleSubmitError(error: any) {

    this.loading = false;
    this.formHelper.handleSubmitError(this.formControls, error);
    this.alertService.error(this.translatePipe.transform('error.login.failed'));
  }

}
