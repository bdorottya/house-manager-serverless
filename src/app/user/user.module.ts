import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneUserComponent } from './one-user/one-user.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AfterFirstLoginComponent } from './after-first-login/after-first-login.component';

import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [
    OneUserComponent,
    UpdateDataComponent,
    UserDashboardComponent,
    AfterFirstLoginComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,

  ]
})
export class UserModule { }
