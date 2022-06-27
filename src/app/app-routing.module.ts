import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AllExpertsComponent } from './expert/all-experts/all-experts.component';
import { AllHomesComponent } from './home/all-homes/all-homes.component';
import { AfterFirstLoginComponent } from './user/after-first-login/after-first-login.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "allhomes", component: AllHomesComponent},
  {path: "allexperts", component: AllExpertsComponent},
  {path: "userhome", component: UserDashboardComponent},
  {path: "firstlogin", component: AfterFirstLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
