import { Injectable } from '@angular/core';
import { ObjectId } from 'mongodb';
import { BSON } from 'realm-web';
import { User } from '../user/socialUser.model';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  constructor() { }

  app_id:string = "housemanager-zblhe";
  admin_email:string = "admin@system.com";
  admin_password:string = "admin1234";



  async getExpert(id:string){
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
    let newId = new BSON.ObjectID(id);
    return await collection?.findOne({_id: newId});
  }

  async updatePrices(expertId:ObjectId,services:any[]){
    let app = new Realm.App({id: this.app_id});
    let mongo = app.currentUser?.mongoClient("mongodb-atlas");
    let collection = mongo?.db("home-maker").collection('users');
    return await collection?.findOneAndUpdate({_id: expertId}, {$set: {prices: services}});
  }


}
