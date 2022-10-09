import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ObjectId } from 'mongodb';
import { Subject } from 'rxjs';
import { SocialUser, updateUserDao, User, UserDAO } from './socialUser.model';

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



  async updateUser(email: string, user: updateUserDao){
    console.log("update userben");
    const data = {
      email: email,
      avatar: user.avatar,
      phone: user.phone
    }
    console.log(data);
    let update = this.httpClient.post(this.base_url, data);
    update.subscribe(data => {
      console.log(data);
    })
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



}
