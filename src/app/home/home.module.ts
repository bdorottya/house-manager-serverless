import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllHomesComponent } from './all-homes/all-homes.component';
import { OneHomeComponent } from './one-home/one-home.component';
import { UploadHomeComponent } from './upload-home/upload-home.component';
import { SavedHomesComponent } from './saved-homes/saved-homes.component';



@NgModule({
  declarations: [

  
    AllHomesComponent,
        OneHomeComponent,
        UploadHomeComponent,
        SavedHomesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
