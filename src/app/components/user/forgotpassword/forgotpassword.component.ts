import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TranslatePipe } from '../../../translations/translate.pipe';
import { UserService } from '../../../services/user.service';

// Services
import { AuthenticationService } from '../../../services/authentication.service';
import { AlertService } from '../../../services/alert.service';


// Helpers
import { FormHelper } from '../../../_helpers/form.helper';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private translatePipe: TranslatePipe,
    private formHelper: FormHelper,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = '/login';
  }

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
    this.userService.forgotpassword(this.formControls.email.value)
      .pipe(first())
      .subscribe(
        res => this.handleSubmitSuccess(res),
        error => this.handleSubmitError(error)

      );
  }


  protected handleSubmitSuccess(res: any) {
    this.alertService.success(this.translatePipe.transform('password.sent'), 6000, true);
    this.router.navigate([this.returnUrl]);
  }

  protected handleSubmitError(error: any) {

    this.loading = false;
    this.formHelper.handleSubmitError(this.formControls, error);
    this.alertService.error(this.translatePipe.transform('error.request.failed'));
  }

}

