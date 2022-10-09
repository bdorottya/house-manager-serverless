import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AllExpertsComponent } from './expert/all-experts/all-experts.component';
import { AllHomesComponent } from './home/all-homes/all-homes.component';
import { OneHomeComponent } from './home/one-home/one-home.component';
import { SavedHomesComponent } from './home/saved-homes/saved-homes.component';
import { HomePageComponent } from './navigation/home-page/home-page.component';
import { AfterFirstLoginComponent } from './user/after-first-login/after-first-login.component';
import { UpdateDataComponent } from './user/update-data/update-data.component';
import { UploadAvatarComponent } from './user/upload-avatar/upload-avatar.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { PleaseSignInComponent } from './navigation/please-sign-in/please-sign-in.component';
import { ExpertDashboardComponent } from './expert/expert-dashboard/expert-dashboard.component';
import { OneExpertComponent } from './expert/one-expert/one-expert.component';

const routes: Routes = [
  {path: "", component:HomePageComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "allhomes", component: AllHomesComponent},
  {path: "allexperts", component: AllExpertsComponent},
  {path: "userhome", component: UserDashboardComponent, canActivate: [AuthGuard]},
  {path: "firstlogin", component: AfterFirstLoginComponent},
  {path: "savedhomes", component: SavedHomesComponent},
  {path: "avatarupload", component: UploadAvatarComponent},
  {path: "datachange", component: UpdateDataComponent},
  {path: "onehome/:id", component: OneHomeComponent},
  {path: "pleasesignin", component: PleaseSignInComponent},
  {path: "expertdashboard", component: ExpertDashboardComponent},
  {path: "oneexpert/:id", component: OneExpertComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
