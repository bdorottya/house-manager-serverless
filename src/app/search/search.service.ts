import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from "@angular/cdk/overlay/overlay-directives";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AnyNaptrRecord } from "dns";
import { ObjectId } from "mongodb";
import { BSON } from "realm-web";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HomeDAO } from "../home/home.model";
import { User } from "../user/socialUser.model";
import { HomeSearchQuery } from "./query.model";

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

    constructor(private router: Router){}

    async expertResults(city:string, field:string){
      let app = new Realm.App({id: this.app_id});
      let user: any;
      let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
      if(app.currentUser){
        user = app.currentUser;
      }else{
        user = app.logIn(creds);
      }
      let mongo = app.currentUser?.mongoClient("mongodb-atlas");
      let collection = mongo?.db("home-maker").collection("users");
      let result = collection?.find({role: 'expert', city: city, field: field});
      result?.then(data => {
        this.expertDocs.next(data);
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
      let results = collection?.find();
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
      return collection?.find({}, {sort: {_uploadDate: 1}, limit: 3});
    }

    async getSimilarHomes(home: HomeDAO){
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
      let priceLimit = {$lt: home.price+100};
      let sizeLimit = {$gt: home.size-5, $lt: home.size+15};
      let query = {city: home.city, price: priceLimit, size: sizeLimit};
      console.log(query);
      return collection?.find(query,{limit:4});


    }

    async queryHomes(rawQuery:any){
      console.log(rawQuery);
      let results: Promise<HomeDAO[]> | undefined;
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
      let query = this.queryBuilder(rawQuery);
      console.log(query);
      results = collection?.find(query);
      await results?.then(data => {
          this.documents.next(data);
          this.foundDocuments = data;
      })
    }


    queryBuilder(query:any){
      let finalQuery: any = {};
      Object.entries(query).forEach(entry => {
        const [key, value] = entry;
        if(value){
          if(typeof(value) === "object"){
            let values:any;
            values = value;
            let limits = new Minmax();
            let limit:any;

            if(values.length >= 1){
              let options:any[] = [];
              values.forEach((value: any) => {
                options.push({key: value})
              });
              finalQuery[key] = {$or: options};
              return;
            }
            if(!Object.values(values)[0] && !Object.values(values)[1]){
              return;
            }
            if(Object.values(values)[0] && Object.values(values)[1]){
              limits.min = Object.values(values)[0] as unknown as number;
              limits.max = Object.values(values)[1] as unknown as number;
              limit = {$gt: limits.min, $lt: limits.max}
              finalQuery[key] = limit;
              return;
            }
            if(Object.values(values)[0] && !Object.values(values)[1]){
              limits.min = Object.values(values)[0] as unknown as number;
              limit = {$gt: limits.min}
              finalQuery[key] = limit;
              return;
            }
            if(Object.values(values)[1] && !Object.values(values)[0]){
              limits.max = Object.values(values)[1] as unknown as number;
              limit = {$lt: limits.max}
              finalQuery[key] = limit;
              return;
            }
          }
          if(key == "minBathroom"){
            let goodKey = "bathroom"
            let limit = {$gt: value as number};
            finalQuery[goodKey] = limit;
          }
          if(key == "minBedroom"){
            let goodKey = "bedroom";
            let limit = {$gt: value as number};
            finalQuery[goodKey] = limit;
          }
          else{
            finalQuery[key] = value;
          }
      }})
      return finalQuery;
    }
}
