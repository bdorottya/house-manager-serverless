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
import {MatPaginatorModule} from '@angular/material/paginator';


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
    MatPaginatorModule,
    MatSnackBarModule,
    HomeModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class UserModule { }
