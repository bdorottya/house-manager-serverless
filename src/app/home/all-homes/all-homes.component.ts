import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-homes',
  templateUrl: './all-homes.component.html',
  styleUrls: ['./all-homes.component.scss']
})
export class AllHomesComponent implements OnInit {

  baseUrl = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/getHomes";
  app_id:string = "housemanager-zblhe";

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    let app = new Realm.App({id: this.app_id});
    let creds = Realm.Credentials.anonymous();
    let user = app.logIn(creds);
    let homes = this.httpClient.get(this.baseUrl);
    homes.subscribe(data => {
      console.log(data);
    })
  }

}
