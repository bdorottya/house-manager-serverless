import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneUserComponent } from './one-user/one-user.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AfterFirstLoginComponent } from './after-first-login/after-first-login.component';

import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeModule } from '../home/home.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    OneUserComponent,
    UpdateDataComponent,
    UserDashboardComponent,
    AfterFirstLoginComponent,
    UploadAvatarComponent,
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatBadgeModule,
    MatSnackBarModule,
    HomeModule,
    MatProgressSpinnerModule
  ]
})
export class UserModule { }
