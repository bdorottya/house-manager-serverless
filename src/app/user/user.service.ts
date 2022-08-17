import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ObjectId } from 'mongodb';
import { SocialUser, updateUserDao, UserDAO } from './socialUser.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  app_id:string = "housemanager-zblhe";
  admin_email:string = "admin@system.com";
  admin_password:string = "admin1234";
  base_url:string = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/updateUser";
  addhome_url:string = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/addUploadedHome";
  image:string = "";



  constructor(private httpClient: HttpClient, private store: AngularFireStorage) { }

  async getUser(userEmail:string): Promise<SocialUser>{
    let app = new Realm.App({id: this.app_id});
    return await app.currentUser?.callFunction("getUser", userEmail) as SocialUser;
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
    let app = new Realm.App({id: this.app_id});
    let user = app.currentUser;
    let userId = localStorage.getItem("userID") as string;
    console.log("userId: ", userId);
    let res = this.httpClient.post(this.addhome_url, {userId: userId, homeId: homeId});
    res.subscribe(data => {
      console.log(data);
    })
  }



}
