import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneUserComponent } from './one-user/one-user.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';



@NgModule({
  declarations: [
    OneUserComponent,
    UpdateDataComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
