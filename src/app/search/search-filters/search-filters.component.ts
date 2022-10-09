import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/environment/constants';
import { HomeArray } from 'src/app/home/home.constants';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {

  constructor(private fb: FormBuilder, private searchService: SearchService) {

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
  open:boolean = false;

  extras: Array<any> = [
    {name: 'Lift az épületben', value: 'elevator', icon: 'elevator'},
    {name: 'Padlás/Pince', value: 'attic', icon: 'warehouse'},
    {name: 'Erkély/terasz', value: 'balcony', icon: 'balcony'},
    {name: 'Kert', value: 'garden', icon: 'yard'},
    {name: 'Légkondi', value: 'ac', icon: 'ac_unit'},
    {name: 'Kisállat megengedett', value: 'pet', icon: 'pets'},
    {name: 'Dohányzás megengedett', value: 'smoke', icon: 'smoking_rooms'},
    {name: 'Csak képes hirdetés', value: 'hasImage', icon: 'image'},
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
      type: ['elado', Validators.required],
      city: ['', [Validators.required]],
      city2: [''],
      buildingType: [''],
      condition: [''],
      level: this.fb.group({
        minLevel: [''],
        maxLevel: [''],
      }),
      size: this.fb.group({
        minSize: [''],
        maxSize: [''],
      }),
      price: this.fb.group({
        minPrice: [''],
        maxPrice: [''],
      }),
      minBathroom: [''],
      minBedroom: [''],
      heatingType: [''],
      parking: [''],
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

    expand(){

      if(this.open === true){
        this.open = false;
      }else{
        this.open = true;
      }
    }

    search(searchType:string){
      console.log("lefut");
      if(searchType === "expert"){
        if(this.expertForm.valid){

        }
      }
      if(searchType === "home"){
        if(!this.homeForm.invalid){
          console.log("valid");
          let query = this.homeForm.value;
          if(this.homeForm.get('type')?.value == 'kiado'){
            query.price.minPrice = query.price.minPrice*1000;
            query.price.maxPrice = query.price.maxPrice*1000
          }
          if(this.homeForm.get('type')?.value == "elado"){
            query.price.minPrice = query.price.minPrice*1000000;
            query.price.maxPrice = query.price.maxPrice*1000000;
          }
          let results = this.searchService.queryHomes(query);
          results.then(data => {
            console.log(this.searchService.foundDocuments);
          })
        }else{
          console.log("invalid");
        }
      }
    }
}
