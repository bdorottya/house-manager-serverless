import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { QueryBuilderComponent } from './query-builder/query-builder.component';

import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    SearchResultsComponent,

    QueryBuilderComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule
  ]
})
export class SearchModule { }
