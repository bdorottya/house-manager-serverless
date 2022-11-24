import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllHomesComponent } from './all-homes/all-homes.component';
import { OneHomeComponent } from './one-home/one-home.component';
import { UploadHomeComponent } from './upload-home/upload-home.component';
import { BrowserModule } from '@angular/platform-browser'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { TypePipe } from '../pipes/type.pipe';
import { YesNoPipe } from '../pipes/yesno.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OneHomeComponent,
    UploadHomeComponent,
    TypePipe,
    YesNoPipe
  ],
  imports: [
    BrowserModule,
    MatExpansionModule,
    MatIconModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  exports: [
    UploadHomeComponent
  ]
})
export class HomeModule { }
