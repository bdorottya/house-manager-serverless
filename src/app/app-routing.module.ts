import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AllExpertsComponent } from './expert/all-experts/all-experts.component';
import { AllHomesComponent } from './home/all-homes/all-homes.component';
import { OneHomeComponent } from './home/one-home/one-home.component';
import { HomePageComponent } from './navigation/home-page/home-page.component';
import { UpdateDataComponent } from './user/update-data/update-data.component';
import { UploadAvatarComponent } from './user/upload-avatar/upload-avatar.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AuthGuard, ExpertTypeGuard, UserTypeGuard } from './auth/auth.guard';
import { PleaseSignInComponent } from './navigation/please-sign-in/please-sign-in.component';
import { ExpertDashboardComponent } from './expert/expert-dashboard/expert-dashboard.component';
import { OneExpertComponent } from './expert/one-expert/one-expert.component';
import { MovingComponent } from './navigation/moving/moving.component';
import { ServicesComponent } from './navigation/services/services.component';

const routes: Routes = [
  {path: "", component:HomePageComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "allhomes", component: AllHomesComponent},
  {path: "allexperts", component: AllExpertsComponent},
  {path: "userhome", component: UserDashboardComponent, canActivate: [AuthGuard, UserTypeGuard]},
  {path: "onehome/:id", component: OneHomeComponent},
  {path: "pleasesignin", component: PleaseSignInComponent},
  {path: "expertdashboard", component: ExpertDashboardComponent, canActivate: [AuthGuard, ExpertTypeGuard]},
  {path: "oneexpert/:id", component: OneExpertComponent},
  {path: 'moving', component: MovingComponent},
  {path: 'services', component: ServicesComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes,  {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  providers: [AuthGuard, UserTypeGuard, ExpertTypeGuard]
})
export class AppRoutingModule { }
