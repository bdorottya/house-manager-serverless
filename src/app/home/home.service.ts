import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user/user.service';
import { HomeDAO } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  app_id:string = "housemanager-zblhe";
  admin_email:string = "admin@system.com";
  admin_password:string = "admin1234";

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  async uploadHome(home: HomeDAO){
    const app = new Realm.App({id: this.app_id});
    let date = new Date();
    let mongo = app.currentUser?.mongoClient("mongodb-atlas");
    let collection = mongo?.db("home-maker").collection("homes");
    home.uploadDate = date;
    try {
      let res = await collection?.insertOne(home);
      if(res){
        console.log(res.insertedId);
        let promise = this.userService.updateUserAfterHomeUpload(res.insertedId);
        promise.then(() => {
          this.snackBar.open("Sikeres feltöltés!", "OK");
        }).catch(err => {
          console.log(err);
        });
      }
    }
    catch(err){
      console.log(err);
    }
  }

  viewed(){}
  saved(){}
}
