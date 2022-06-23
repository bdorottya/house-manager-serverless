import { Injectable } from '@angular/core';
import * as Realm from 'realm-web';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  app_id:string = "housemanager-zblhe";
  loggedInUser: boolean = false;

  constructor() {}

  async loginWithEmailAndPass(email: string, password: string){
    const app = new Realm.App({id: this.app_id});
    const creds = Realm.Credentials.emailPassword(email, password);
    try{
      let user = await app.logIn(creds);
      console.assert(user.id === app.currentUser?.id);
      console.log(app.currentUser?.id);
      return user;
    }catch(err){
      console.error("failed to log in", err);
      return 0;
    }
  }


}
