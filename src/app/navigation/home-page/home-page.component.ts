import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

services:any[] = [
  {"name": "Költöztetés", "desc": "A költözésben is segítünk! Keresse bármelyik hitelesített költöztető partnerünket.", "img": "../../../assets/img/moveout.png"},
  {"name": "Ingatlanos megbízása", "desc": "Másra bízná az eladást? Keresse bizalommal ingatlanos kollégáinkat.", "img": "../../../assets/img/ingatlanos.png"},
  {"name": "Könnyen kezelhető felület", "desc": "Weboldalunkon és mobilapplikációnkban is kezelheti ingatlanügyeit, bárhol, bármikor.", "img": "../../../assets/img/app.png"},
  {"name": "Szakember kereső", "desc": "Ellenőrzött, hitelesített szakemberek az ország bármely pontján.", "img": "../../../assets/img/certificate.png"},
  {"name": "Kiemelt hirdetések", "desc": "Találon vevőt 2x olyan gyorsan! Kiemelt hirdetéseink garantáltan hoznak érdeklődőket.", "img": "../../../assets/img/savehome.png"},
  {"name": "Hitelügyintézés", "desc": "Kollégáink rendelkezésére állnak hitelekkel kapcsolatos ügyekben is.", "img": "../../../assets/img/hitel.png"}
];

searchForm = this.fb.group({
  city: ['', Validators.required],
  minSize: [''],
  maxSize: [''],
  minPrice: [''],
  maxPrice: [''],
  type: [''],
})

elado:boolean=true;
eladoTexts = ["Min ár (M)", "Max ár (M)", "Min ár (e/hó)", "Max ár (e/hó)"];



  constructor(private fb: FormBuilder, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.searchForm.get("type")?.valueChanges.subscribe(x => {
      if(x == "kiado"){
        this.elado = false
      }else{
        this.elado = true
      }
    })
  }

  search(){
    if(!this.searchForm.invalid){
      let query = this.searchForm.value;
      this.searchService.queryHomesFromMainPage(query).then(data =>{
        console.log(data);
      });
    }else{
      this.router.navigate(["/allhomes"]);
    }
  }

}
