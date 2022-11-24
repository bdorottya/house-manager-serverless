import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ObjectId } from 'mongodb';
import { Subject } from 'rxjs';
import { User } from './socialUser.model';
import * as Realm from 'realm-web';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser:Subject<any> = new Subject();

  app_id:string = "housemanager-zblhe";
  admin_email:string = "admin@system.com";
  admin_password:string = "admin1234";
  base_url:string = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/updateUser";
  addhome_url:string = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/addUploadedHome";
  image:string = "";



  constructor(private httpClient: HttpClient, private store: AngularFireStorage) { }

  async getUser(userEmail:string): Promise<User>{
    let app = new Realm.App({id: this.app_id});
    let mongo = app.currentUser?.mongoClient("mongodb-atlas");
    let collection = mongo?.db("home-maker").collection("users");
    return await collection?.findOne({email: userEmail});
  }

  async saveExpert(user:any, expert:any){
    let app = new Realm.App({id: this.app_id});
    let mongo = app.currentUser?.mongoClient("mongodb-atlas");
    let collection = mongo?.db("home-maker").collection("users");
    console.log(user,expert);
    return await collection?.updateOne({_id: user._id}, {$push: {_savedExperts: expert._id}});
  }

  async updateUserAfterHomeUpload(homeId:string){
    let userId = localStorage.getItem("userEmail") as string;
    let app = new Realm.App({id: this.app_id});
    let user = app.currentUser;
    console.log("userId: ", userId);
    console.log(homeId);
    let res = this.httpClient.post(this.addhome_url, {userId: userId, homeId: homeId});
    res.subscribe(data => {
      console.log(data);
    })
  }

  async removeSavedHome(user:User, newArray:ObjectId[]){
    let app = new Realm.App({id: this.app_id});
    let mongo = app.currentUser?.mongoClient("mongodb-atlas");
    let collection = mongo?.db("home-maker").collection("users");
    let newUser = user;
    newUser._savedHomes = newArray;
    return collection?.updateOne({_id: user._id}, {newUser});
  }



}
