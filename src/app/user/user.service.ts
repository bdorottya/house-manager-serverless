import { Injectable } from '@angular/core';
import { ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  app_id:string = "housemanager-zblhe";

  constructor() { }

  async getUser(userEmail:string){
    let app = new Realm.App({id: this.app_id});
    return await app.currentUser?.callFunction("getUser", userEmail);
  }
}
