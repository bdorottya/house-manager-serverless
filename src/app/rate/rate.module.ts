import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRatingComponent } from './add-rating/add-rating.component';
import { GetRatingsComponent } from './get-ratings/get-ratings.component';



@NgModule({
  declarations: [
    AddRatingComponent,
    GetRatingsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RateModule { }
