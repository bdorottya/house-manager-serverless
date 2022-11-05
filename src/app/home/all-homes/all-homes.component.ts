import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { idToken } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from 'src/app/navigation/spinner/spinner.component';
import { HomeSearchQuery } from 'src/app/search/query.model';
import { SearchService } from 'src/app/search/search.service';
import { HomeDAO } from '../home.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-all-homes',
  templateUrl: './all-homes.component.html',
  styleUrls: ['./all-homes.component.scss']
})
export class AllHomesComponent implements OnInit, AfterViewInit {

  baseUrl = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/getHomes";
  app_id:string = "housemanager-zblhe";
  admin_email:string = "admin@system.com";
  admin_password:string = "admin1234";

  homes: HomeDAO[] = [];


  city2:string[] = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI","XXII","XXIII"];
  conditions:string[] = ["Újépítésű", "újszerű", "Frissen Felújított", "Felújításra szorul", "Telek", "Épülő"];
  parking:string[] = ["Külön építésű garázs", "Garázs az épület aljában/tetején", "Fedetlen kocsibeálló", "Utcán"];
  heating:string[] = ["Gázkazán", "Elektromos", "Gáz (cirkó)", "Gáz (konvektor)", "fan-coil", "Vegyes tüzelésű kazán", "Cserépkályha", "Távfűtés", "Padlófűtés", "Falfűtés", "Egyéb"];
  yesno:any[]=[{"name": "Igen", "value": true}, { "name": "Nem", "value": false}];
  sorting:any[]=[{name: "Ár szerint növekvő", value: 'price-asc'}, {name: "Ár szerint csökkenő", value: 'price-desc'}, {name: "Méret szerint növekvő", value: 'size-asc'}, {name: "Méret szerint csökkenő", value: 'size-desc'}];
  buildingType:string[]=["Tégla lakás","Panel lakás","Faház","Egyéb"];

  user:any;
  isLoggedIn!:boolean;

  query: HomeSearchQuery = new HomeSearchQuery();
  setQuery:any;

  viewMode = new FormControl('');
  empty:boolean = false;

  isLoading:boolean = true;

  fromHomePage?:boolean;

  sortingForm:FormGroup = new FormGroup({
    sortingSelect: new FormControl('')
  })


  constructor(private dialog: MatDialog, private routerSnapshot: ActivatedRoute, private serachService: SearchService, public homeService: HomeService) { }

   ngOnInit(): void {
    this.sortingForm.get('sortingSelect')?.setValue('price-asc');
    let app = new Realm.App({id: this.app_id});
    let user:any;
    let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
    this.dialog.open(SpinnerComponent);
    if(app.currentUser){
      user = app.currentUser;
      this.user = user;
    }else{
      user = app.logIn(creds);
      this.user = user;
    }
    if(this.routerSnapshot.snapshot.queryParams['data']){
      let fromHomePage = JSON.parse(this.routerSnapshot.snapshot.queryParams['data']);
      console.log(fromHomePage);
      if(fromHomePage){
        this.setQuery = fromHomePage;
        this.serachService.queryHomes(fromHomePage);
        this.serachService.documents.subscribe(obs => {
          this.isLoading = false;
          console.log(obs);
          this.homes = obs;
          this.homes = this.homes.sort((a,b) => a.price - b.price);
          if(this.homes.length == 0){
            this.empty = true;
            }else{
              this.empty = false;
          }
          this.dialog.closeAll();
        })}
        }else{
          this.serachService.getAllHomes();
          this.serachService.documents.subscribe(observer => {
            console.log(observer);
            this.homes = observer;
            this.homes = this.homes.sort((a,b) => a.price - b.price);
            if(this.homes.length == 0){
              this.empty = true;
              }else{
                this.empty = false;
              }
            this.dialog.closeAll();
          })
        }
    }

    ngAfterViewInit(){
      this.sortingForm.get('sortingSelect')?.valueChanges.subscribe(data => {
        console.log(data);
        if(data == 'price-asc'){
          this.homes.sort((a,b) => a.price - b.price)
        }
        if(data == 'price-desc'){
          this.homes.sort((a,b) => b.price - a.price)
        }
        if(data == 'size-asc'){
          this.homes.sort((a,b) => a.size - b.size)
        }
        if(data == "size-desc"){
          this.homes.sort((a,b) => b.size - a.size);
        }
      })
    }
}
