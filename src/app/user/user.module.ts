import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateDataComponent } from './update-data/update-data.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeModule } from '../home/home.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SavedExpertsComponent } from './saved-experts/saved-experts.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';


@NgModule({
  declarations: [
    UpdateDataComponent,
    UserDashboardComponent,
    UploadAvatarComponent,
    SavedExpertsComponent,
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatBadgeModule,
    MatSnackBarModule,
    HomeModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    IvyCarouselModule
  ]
})
export class UserModule { }
