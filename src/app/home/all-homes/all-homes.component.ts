import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HomeSearchQuery } from 'src/app/search/query.model';
import { SearchService } from 'src/app/search/search.service';
import { HomeDAO } from '../home.model';

@Component({
  selector: 'app-all-homes',
  templateUrl: './all-homes.component.html',
  styleUrls: ['./all-homes.component.scss']
})
export class AllHomesComponent implements OnInit {

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
  sorting:string[]=["Ár szerint növekvő", "Ár szerint csökkenő", "Méret szerint növekvő", "Méret szerint csökkenő"];
  buildingType:string[]=["Tégla lakás","Panel lakás","Faház","Egyéb"];

  query: HomeSearchQuery = new HomeSearchQuery();

  viewMode = new FormControl('');
  empty:boolean = false;

  constructor(private httpClient: HttpClient, private routerSnapshot: ActivatedRoute, private serachService: SearchService) { }

   ngOnInit(): void {
    let app = new Realm.App({id: this.app_id});
    let user;
    let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
    if(app.currentUser){
      user = app.currentUser;
    }else{
      user = app.logIn(creds);
    }
    this.serachService.getAllHomes();
    this.serachService.documents.subscribe(observer => {
      console.log(observer);
      this.homes = observer;
      if(this.homes.length == 0){
        this.empty = true;
      }else{
        this.empty = false;
      }
    })

    /*if(this.serachService.foundDocuments.length > 0){
      this.homes = this.serachService.foundDocuments;
      console.log(this.homes);
    }else{
      let homes = this.httpClient.get<HomeDAO[]>(this.baseUrl);
      this.viewMode.setValue('col');
      homes.subscribe(data => {
        if(data){
          this.homes = data;
          console.log(this.homes);
        }
      })
    }*/
  }
}
