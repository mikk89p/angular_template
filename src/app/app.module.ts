// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';

// Components
import { AppComponent } from './app.component';

// Helpers
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { FormHelper } from './_helpers/form.helper';

// Services
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { TranslateService } from './translations/translate.service';
import { UserService } from './services/user.service';

// Custom modules
import { MaterialModule } from './modules/app.material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// Basic components
import { NavComponent } from './components/layout/nav/nav.component';
import { BottomNavComponent } from './components/layout/bottom-nav/bottom-nav.component';
import { AlertComponent, SnackComponent } from './components/alert/alert.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { TranslatePipe } from './translations/translate.pipe';
import { TRANSLATION_PROVIDERS } from './translations/translations';

// Basic Pages
import { Error404Component } from './components/pages/error404/error404.component';
import { AboutComponent } from './components/pages/about/about.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ForgotpasswordComponent } from './components/user/forgotpassword/forgotpassword.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';

// Specific components
import { MainComponent } from './components/pages/main/main.component';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavComponent,
    Error404Component,
    LoginComponent,
    AlertComponent,
    LogoutComponent,
    BottomNavComponent,
    SnackComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    TranslatePipe,
    UpdateUserComponent,
    PricingComponent,
    MainComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgxPayPalModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    TRANSLATION_PROVIDERS,
    FormHelper,
    TranslatePipe,
    TranslateService,
    AlertService,
    AuthenticationService,
    UserService,

  ],
  entryComponents: [SnackComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
