import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'mongodb';
import { HomeDAO } from '../home.model';
import { TypePipe } from 'src/app/pipes/type.pipe';
import { UserDAO } from 'src/app/user/socialUser.model';

@Component({
  selector: 'app-one-home',
  templateUrl: './one-home.component.html',
  styleUrls: ['./one-home.component.scss']
})
export class OneHomeComponent implements OnInit {

  baseUrlHome = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/gethome";
  baseUrlUploader = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/getUploader";
  app_id:string = "housemanager-zblhe";

  home:HomeDAO = new HomeDAO();
  uploader:UserDAO = new UserDAO("", "","");

  constructor(private httpClient: HttpClient, private router: ActivatedRoute) { }

  ngOnInit(): void {
    let app = new Realm.App({id: this.app_id});
    let creds = Realm.Credentials.anonymous();
    let user = app.logIn(creds);
    let id = this.router.snapshot.paramMap.get("id") as string;
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    console.log(queryParams);
    let home = this.httpClient.get<HomeDAO>(this.baseUrlHome, {params: queryParams});
    home.subscribe(data => {
      console.log(data);
      if(data){
        console.log(data);
        this.home = data;
        let uploaderId = this.home.uploader as string;
        let params = new HttpParams();
        params = params.append("id", uploaderId);
        let uploaderStream = this.httpClient.get<UserDAO>(this.baseUrlUploader, {params: params});
        uploaderStream.subscribe(data => {
          if(data){
            this.uploader = data;
            console.log(this.uploader);
          }
        })
      }else{
        console.log("error");
      }
    })
  }

}
