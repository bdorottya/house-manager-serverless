import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/environment/constants';
import { HomeArray } from 'src/app/home/home.constants';

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
  homeForm!: FormGroup;

  expertForm = new FormGroup({
    city: new FormControl(''),
    field: new FormControl('')
  });

  city2:any;
  buildingType:any;
  condition: any;
  heating: any;
  parking: any;
  yesno: any;

  extras: Array<any> = [
    {name: 'Lift az épületben', value: 'elevator'},
    {name: 'Padlás/Pince', value: 'attic'},
    {name: 'Erkély/terasz', value: 'balcony'},
    {name: 'Kert', value: 'garden'},
    {name: 'Légkondi', value: 'ac'},
    {name: 'Kisállat megengedett', value: 'pet'},
    {name: 'Dohányzás megengedett', value: 'smoke'},
    {name: 'Csak képes hirdetés', value: 'hasImage'},
  ]


  ngOnInit(): void {
    this.city2 = HomeArray.city2;
    this.buildingType = HomeArray.buildingType;
    this.condition = HomeArray.conditions;
    this.heating = HomeArray.heating;
    this.parking = HomeArray.parking;
    this.yesno = HomeArray.yesno;

    this.fields = Constants.expertFields;
    this.homeForm = this.fb.group({
      type: ['', Validators.required],
      city: ['', [Validators.required]],
      city2: [''],
      buildingType: [''],
      condition: [''],
      maxLevelsInBuilding: [''],
      minLevel: [''],
      maxLevel: [''],
      minSize: [''],
      maxSize: [''],
      minBathroom: [''],
      minBedroom: [''],
      heatingType: [''],
      parking: [''],
      minPrice: [''],
      maxPrice: [''],
      elevator: [''],
      balcony: [''],
      garden: [''],
      attic: [''],
      ac: [''],
      pet: [''],
      smoke: [''],
      hasImages: ['']
    })

    }

    search(){}
}
