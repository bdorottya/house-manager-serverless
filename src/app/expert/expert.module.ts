import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllExpertsComponent } from './all-experts/all-experts.component';
import { ExpertDashboardComponent } from './expert-dashboard/expert-dashboard.component';
import { ModifyPricesComponent } from './modify-prices/modify-prices.component';
import { OneExpertComponent } from './one-expert/one-expert.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { UpdateAvatarComponent } from './update-avatar/update-avatar.component';
import { SearchFiltersComponent } from '../search/search-filters/search-filters.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RateModule } from '../rate/rate.module';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { SearchModule } from '../search/search.module';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
    declarations: [
        AllExpertsComponent,
        ExpertDashboardComponent,
        ModifyPricesComponent,
        OneExpertComponent,
        UpdateDataComponent,
        UpdateAvatarComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule,
        SearchModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatIconModule,
        RateModule,
        MatButtonModule,
        MatTooltipModule
    ]
})
export class ExpertModule { }
