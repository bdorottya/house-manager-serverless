import { Injectable } from '@angular/core';
import { ObjectId } from 'mongodb';
import * as Realm from 'realm-web';
import { UserDAO } from '../user/socialUser.model';

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
      this.loggedInUser = true;
      localStorage.setItem("userID", app.currentUser?.id as string);
      localStorage.setItem("userEmail", email);
      return user;
    }catch(err){
      console.error("failed to log in", err);
      return 0;
    }
  }

  async googleLogin(creds: Realm.Credentials){
    const app = new Realm.App({id: this.app_id});
    try{
      let user = await app.logIn(creds);
      console.assert(user.id === app.currentUser?.id);
      console.log(app.currentUser?.id);
      this.loggedInUser = true;
      localStorage.setItem("userID", app.currentUser?.id as string);
      return user;
    }catch(err){
      console.error("failed to log in", err);
      return 0;
    }
  }

  async signup(email: string, password: string, lastName: string, firstName: string){
    let app = new Realm.App({id: this.app_id});
    let creds = Realm.Credentials.anonymous();
    let user = await app.logIn(creds);
    let mongo = app.currentUser?.mongoClient("mongodb-atlas");
    let collection = mongo?.db("home-maker").collection("users");    
    try{
      await app.emailPasswordAuth.registerUser({ email, password });
      let user = new UserDAO(email, firstName, lastName);
      try {
        let res = await collection?.insertOne(user);
        if(res){
          console.log(res.insertedId);
          return res;} return;
      }catch(err){
        console.log("error in saving user", err);
        return;
      }
    }catch(err){
      console.error(err);
      return;
    }
  }

  async fetchFirstLoginData(email:string){
    let app = new Realm.App({id: this.app_id});
  }

  async logOut(){
    const app = new Realm.App({id: this.app_id});
    await app.currentUser?.logOut();
    this.loggedInUser = false;
    localStorage.removeItem("userID");
    localStorage.removeItem("userEmail");
  }
}

