import { Injectable } from '@angular/core';
import { ObjectId } from 'mongodb';
import { UserDAO } from './socialUser.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  app_id:string = "housemanager-zblhe";

  constructor() { }

  async getUser(userEmail:string): Promise<UserDAO>{
    let app = new Realm.App({id: this.app_id});
    return await app.currentUser?.callFunction("getUser", userEmail) as UserDAO;
  }
}
