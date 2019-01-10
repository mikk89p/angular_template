import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './components/pages/main/main.component';
import { Error404Component} from './components/pages/error404/error404.component';

// Pages
import { AboutComponent } from './components/pages/about/about.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';

// User
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ForgotpasswordComponent } from './components/user/forgotpassword/forgotpassword.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';

const routes: Routes = [
  // Default
  {path: '', component: MainComponent},
  // User
  {path: 'login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'user/forgotpassword', component: ForgotpasswordComponent},
  {path: 'user/update', component: UpdateUserComponent},
  // Pages
  {path: 'about', component: AboutComponent},
  {path: 'pricing', component: PricingComponent},
  // catch all the rest
  {path: '**', component: Error404Component}
];

@NgModule({
  // PreloadAllModules Load your main application module first, and in the background load all the other modules
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
    }
  )],

  exports: [RouterModule]
})
export class AppRoutingModule { }
