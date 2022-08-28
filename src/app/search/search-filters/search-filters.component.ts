import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/environment/constants';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {

  constructor(private fb: FormBuilder) {

   }

  @Input() searchType:string='expert';
  fields!: string[];

  expertForm = new FormGroup({
    city: new FormControl(''),
    field: new FormControl('')
  });

  ngOnInit(): void {
    this.fields = Constants.expertFields;
    }

    search(){}
}
