import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectId } from 'mongodb';
import { HomeDAO } from 'src/app/home/home.model';
import { SearchService } from 'src/app/search/search.service';
import * as Realm from 'realm-web';
import { Constants } from 'src/app/environment/constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  services:any[] = [
    {"tag": "moving", "name": "Költöztetés", "desc": "A költözésben is segítünk! Keresse bármelyik hitelesített költöztető partnerünket.", "img": "../../../assets/img/moveout.png"},
    {"tag": "services/#ingatlanos", "name": "Ingatlanos megbízása", "desc": "Másra bízná az eladást? Keresse bizalommal ingatlanos kollégáinkat.", "img": "../../../assets/img/ingatlanos.png"},
    {"tag": "services/#design", "name": "Könnyen kezelhető felület", "desc": "Weboldalunkon és mobilapplikációnkban is kezelheti ingatlanügyeit, bárhol, bármikor.", "img": "../../../assets/img/app.png"},
    {"tag": "services/#expert", "name": "Szakember kereső", "desc": "Ellenőrzött, hitelesített szakemberek az ország bármely pontján.", "img": "../../../assets/img/certificate.png"},
    {"tag": "services/#certificate", "name": "Kiemelt hirdetések", "desc": "Találon vevőt 2x olyan gyorsan! Kiemelt hirdetéseink garantáltan hoznak érdeklődőket.", "img": "../../../assets/img/savehome.png"},
    {"tag": "services/#hitel", "name": "Hitelügyintézés", "desc": "Kollégáink rendelkezésére állnak hitelekkel kapcsolatos ügyekben is.", "img": "../../../assets/img/hitel.png"}
  ];

searchForm = this.fb.group({
  city: [''],
  type: ['elado'],
  size: this.fb.group({
    minSize: [''],
    maxSize: [''],
  }),
  price: this.fb.group({
    minPrice: [''],
    maxPrice: [''],
  }),
})

expertForm = this.fb.group({
  city: ['', Validators.required],
  field: ['', Validators.required]
})

showSearch:string = 'home';
fields = Constants.expertFields;

elado:boolean=true;
eladoTexts = ["Millió Ft", "Ezer Ft/hó.", ];

mostRecent:HomeDAO[] = [];

  app_id:string = "housemanager-zblhe";
  admin_email:string = "admin@system.com";
  admin_password:string = "admin1234";


  constructor(private fb: FormBuilder, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    let app = new Realm.App({id: this.app_id});
    let user:any;
    let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
    if(app.currentUser){
      user = app.currentUser;
    }else{
      user = app.logIn(creds);
    }
    this.searchForm.get("type")?.valueChanges.subscribe(x => {
      if(x == "kiado"){
        this.elado = false
      }else{
        this.elado = true
      }
    })
    let res = this.searchService.getMostRecentHomes();
    res?.then(data => {
      this.mostRecent = data;
      console.log(this.mostRecent);
    })
  }

  goToHome(homeId:ObjectId){
    this.router.navigate([`/onehome/${homeId}`]);
  }

  search(){
    if(!this.searchForm.invalid){
      let query = this.searchForm.value;
      console.log(query);
      let results = this.searchService.queryBuilder(query);
      console.log(results);
      this.router.navigate(['/allhomes'],{queryParams: {'data': JSON.stringify(query)}});
    }else{
      console.log("error");
    }
  }

  searchExpert(){
    if(!this.expertForm.invalid){
      let query = this.expertForm.value;
      console.log(query);
      this.router.navigate(['/allexperts'],{queryParams: {'data': JSON.stringify(query)}});
    }else{
      console.log("error");
    }
  }

  showExpertSearch(){
    if(this.showSearch === 'home'){
      this.showSearch = 'expert';
    }else{
      this.showSearch = 'home';
    }
  }

}
