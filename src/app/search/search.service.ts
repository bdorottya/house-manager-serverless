import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from "@angular/cdk/overlay/overlay-directives";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AnyNaptrRecord } from "dns";
import { ObjectId } from "mongodb";
import { BSON } from "realm-web";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HomeDAO } from "../home/home.model";
import { User } from "../user/socialUser.model";
import * as Realm from 'realm-web';
import { Rate } from "../rate/rate.model";
import { RateService } from "../rate/rate.service";
import { MatDialog } from "@angular/material/dialog";
import { SpinnerComponent } from "../navigation/spinner/spinner.component";

export class Minmax{
  min!: number;
  max!: number;
}

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    foundDocuments: HomeDAO[] = [];

    documents: Subject<HomeDAO[]> = new Subject();
    expertDocs: Subject<User[]> = new Subject();

    app_id:string = "housemanager-zblhe";
    admin_email:string = "admin@system.com";
    admin_password:string = "admin1234";

    constructor(private rateService: RateService, private dialog: MatDialog){}

    async expertResults(query:any){
      let app = new Realm.App({id: this.app_id});
      let user: any;
      let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
      if(app.currentUser){
        user = app.currentUser;
      }else{
        user = app.logIn(creds);
      }
      this.dialog.open(SpinnerComponent);
      let mongo = app.currentUser?.mongoClient("mongodb-atlas");
      let collection = mongo?.db("home-maker").collection("users");
      let result = collection?.find(query);
      result?.then(data => {
        console.log(data);
        this.expertDocs.next(data);
        this.dialog.closeAll();
      })
    }

    async getAllExperts(){
      let app = new Realm.App({id: this.app_id});
      let user:any;
      let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
      if(app.currentUser){
        user = app.currentUser;
      }else{
        user = app.logIn(creds);
      }
      let mongo = app.currentUser?.mongoClient("mongodb-atlas");
      let collection = mongo?.db("home-maker").collection('users');
      let results = collection?.find({role: 'expert'});
      results?.then(data => {
        data.forEach(expert => {
          let ratings: Rate[] = [];
          this.rateService.getRatings(expert._id).then(data => {
            ratings = data;
            expert._ratings = ratings;
          })
        })
        this.expertDocs.next(data);

      })

    }

    async getAllHomes(){
      let app = new Realm.App({id: this.app_id});
      let user: any;
      let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
      if(app.currentUser){
        user = app.currentUser;
      }else{
        user = app.logIn(creds);
      }
      let mongo = app.currentUser?.mongoClient("mongodb-atlas");
      let collection = mongo?.db("home-maker").collection("homes");
      let results = collection?.find({type: 'elado'});
      results?.then(data => {
        this.documents.next(data);
      })
    }

    getMostRecentHomes(){
      let app = new Realm.App({id: this.app_id});
      let user: any;
      let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
      if(app.currentUser){
        user = app.currentUser;
      }else{
        user = app.logIn(creds);
      }
      let mongo = app.currentUser?.mongoClient("mongodb-atlas");
      let collection = mongo?.db("home-maker").collection("homes");
      return collection?.find({}, {sort: {_uploadDate: -1}, limit: 3});
    }

    async getSimilarHomes(home: HomeDAO): Promise<HomeDAO[]>{
      let app = new Realm.App({id: this.app_id});
      let user;
      let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
      if(app.currentUser){
        user = app.currentUser;
      }else{
        user = app.logIn(creds);
      }
      let mongo = app.currentUser?.mongoClient("mongodb-atlas");
      let collection = mongo?.db("home-maker").collection("homes");
      let priceLimit = {$lt: home.price+200, $gt: home.price-200};
      let sizeLimit = {$gt: home.size-10, $lt: home.size+25};
      let query = {type: home.type, city: home.city, price: priceLimit, size: sizeLimit};

      return collection?.find(query,{limit:4}) as unknown as HomeDAO[];
    }

    async queryHomes(rawQuery:any){

      let results: Promise<HomeDAO[]> | undefined;
      let app = new Realm.App({id: this.app_id});
      let user;
      let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
      if(app.currentUser){
        user = app.currentUser;
      }else{
        user = app.logIn(creds);
      }
      this.dialog.open(SpinnerComponent);
      let mongo = app.currentUser?.mongoClient("mongodb-atlas");
      let collection = mongo?.db("home-maker").collection("homes");
      let query = this.queryBuilder(rawQuery);

      results = collection?.find(query);
      await results?.then(data => {
          this.documents.next(data);
          this.foundDocuments = data;
          this.dialog.closeAll();
      })
    }


    queryBuilder(query:any){
      let finalQuery: any = {};
      Object.entries(query).forEach(entry => {
        const [key, value] = entry;
        if(value){
          if(key === 'city'){
            let cityValue:string = value as string;
            cityValue = (cityValue.charAt(0).toLocaleUpperCase() + cityValue.slice(1));
            finalQuery[key] = cityValue;
            return;
          }
          if(typeof(value) === "object"){
            let values:any;
            values = value;
            let limits = new Minmax();
            let limit:any;

            if(values.length >= 1){
              let options:any[] = [];
              values.forEach((value: any) => {
                options.push(value);
              });
              finalQuery[key] = {$in: options};
              return;
            }
            if(!Object.values(values)[0] && !Object.values(values)[1]){
              return;
            }
            if(Object.values(values)[0] && Object.values(values)[1]){
              limits.min = Object.values(values)[0] as unknown as number;
              limits.max = Object.values(values)[1] as unknown as number;
              limit = {$gte: limits.min, $lte: limits.max}
              finalQuery[key] = limit;
              return;
            }
            if(Object.values(values)[0] && !Object.values(values)[1]){
              if((Object.keys(values)[0] as string).includes("min")){
                limits.min = Object.values(values)[0] as unknown as number;
                limit = {$gte: limits.min}
                finalQuery[key] = limit;
                return;
              }
              if((Object.keys(values)[0] as string).includes("max")){
                limits.min = Object.values(values)[0] as unknown as number;
                limit = {$lte: limits.min}
                finalQuery[key] = limit;
                return;
              }
            }
            if(Object.values(values)[1] && !Object.values(values)[0]){
              if((Object.keys(values)[1] as string).includes("min")){
                limits.min = Object.values(values)[1] as unknown as number;
                limit = {$gte: limits.min}
                finalQuery[key] = limit;
                return;
              }
              if((Object.keys(values)[1] as string).includes("max")){
                limits.min = Object.values(values)[1] as unknown as number;
                limit = {$lte: limits.min}
                finalQuery[key] = limit;
                return;
              }
            }
          }

          if(key == "minBathroom"){
            let goodKey = "bathroom"
            let limit = {$gte: value as number};
            finalQuery[goodKey] = limit;
            return;
          }
          if(key == "minBedroom"){
            let goodKey = "bedroom";
            let limit = {$gte: value as number};
            finalQuery[goodKey] = limit;
            return;
          }
          if(key == 'hasImages'){
            let goodKey = "images";
            finalQuery[goodKey] = {$exists: true};
            return;
          }
          else{
            finalQuery[key] = value;
          }
      }})
      return finalQuery;
    }
}
