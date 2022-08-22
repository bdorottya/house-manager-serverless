import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HomeDAO } from '../home.model';

@Component({
  selector: 'app-all-homes',
  templateUrl: './all-homes.component.html',
  styleUrls: ['./all-homes.component.scss']
})
export class AllHomesComponent implements OnInit {

  baseUrl = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/getHomes";
  app_id:string = "housemanager-zblhe";
  city2:string[] = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI","XXII","XXIII"];
  conditions:string[] = ["Újépítésű", "újszerű", "Frissen Felújított", "Felújításra szorul", "Telek", "Épülő"];
  parking:string[] = ["Külön építésű garázs", "Garázs az épület aljában/tetején", "Fedetlen kocsibeálló", "Utcán"];
  heating:string[] = ["Gázkazán", "Elektromos", "Gáz (cirkó)", "Gáz (konvektor)", "fan-coil", "Vegyes tüzelésű kazán", "Cserépkályha", "Távfűtés", "Padlófűtés", "Falfűtés", "Egyéb"];
  yesno:any[]=[{"name": "Igen", "value": true}, { "name": "Nem", "value": false}];
  sorting:string[]=["Ár szerint növekvő", "Ár szerint csökkenő", "Méret szerint növekvő", "Méret szerint csökkenő"];
  buildingType:string[]=["Tégla lakás","Panel lakás","Faház","Egyéb"];

  viewMode = new FormControl('');
  open:boolean = false;

  homes:HomeDAO[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    let app = new Realm.App({id: this.app_id});
    let creds = Realm.Credentials.anonymous();
    let user = app.logIn(creds);
    let homes = this.httpClient.get<HomeDAO[]>(this.baseUrl);
    homes.subscribe(data => {
      if(data){
        this.homes = data;
        console.log(this.homes);
      }

    })
  }

  expand(){
    if(this.open === true){
      this.open = false;
    }else{
      this.open = true;
    }
  }



}
