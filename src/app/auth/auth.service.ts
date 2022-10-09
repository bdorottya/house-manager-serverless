import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as Realm from 'realm-web';
import { User, UserDAO } from '../user/socialUser.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  app_id:string = "housemanager-zblhe";
  admin_email:string = "admin@system.com";
  admin_password:string = "admin1234";
  loggedInUser?: boolean;
  app:any;
  role!:string;

  constructor(private router: Router, private snackBar: MatSnackBar, private userService: UserService) {}

  async loginWithEmailAndPass(email: string, password: string){
    this.app = new Realm.App({id: this.app_id});
    const creds = Realm.Credentials.emailPassword(email, password);
    try{
      let user = await this.app.logIn(creds);
      console.assert(user.id === this.app.currentUser?.id);
      console.log(this.app.currentUser?.id);
      this.loggedInUser = true;
      localStorage.setItem("userID", this.app.currentUser?.id as string);
      localStorage.setItem("userEmail", email);
      this.userService.getUser(email).then(data => {
        console.log(data);
        this.role = data.role;
      })
      return user;
    }catch(err){
      console.error("failed to log in", err);
      return 0;
    }
  }

  getUser(){

  }

  async insertUser(user: User){
    console.log(user);
    const app = new Realm.App({id: this.app_id});
    let mongo = app.currentUser?.mongoClient("mongodb-atlas");
    let collection = mongo?.db("home-maker").collection("users");
    try{
      let res = await collection?.insertOne(user);
      if(res){
        console.log(res.insertedId);
        return res;
      }else{
        return;
      }
    }catch(err){
        console.log("error in saving user", err);
        return;
    }
  }

  isLoggedIn(){
    const app = new Realm.App({id: this.app_id});
    let id = localStorage.getItem("userID");
    if(id === app.currentUser?.id){
      return true;
    }else{
      return false;
    }
  }

  async googleLogin(creds: Realm.Credentials){
    const app = new Realm.App({id: this.app_id});
    app
    .logIn(creds)
    .then((user) => {
      // The logIn() promise will not resolve until you call `handleAuthRedirect()`
      // from the new window after the user has successfully authenticated.
      console.log(`Logged in with id: ${user.id}`);
    })
    .catch((err) => console.error(err));
  }

  async signup(email: string, password: string){
    let app = new Realm.App({id: this.app_id});
    let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
    let user = await app.logIn(creds);
    try{
      return await app.emailPasswordAuth.registerUser({ email, password });
    }catch(err){
      console.error(err);
      return;
    }
  }

  async logOut(){
    const app = new Realm.App({id: this.app_id});
    await app.currentUser?.logOut();
    console.log(app.currentUser?.isLoggedIn);
    localStorage.removeItem("userID");
    localStorage.removeItem("userEmail");
    this.router.navigate(["/"]);
  }
}

