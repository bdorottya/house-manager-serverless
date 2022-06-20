import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneUserComponent } from './one-user/one-user.component';
import { UpdateDataComponent } from './update-data/update-data.component';



@NgModule({
  declarations: [
    OneUserComponent,
    UpdateDataComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
