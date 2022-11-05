import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectId } from 'mongodb';
import { BSON } from 'realm-web';
import { Rate } from './rate.model';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  app_id:string = "housemanager-zblhe";
  admin_email:string = "admin@system.com";
  admin_password:string = "admin1234";


  constructor(private snackBar: MatSnackBar) { }

  async addRating(expertId:ObjectId, star:number, review:string){
    let app = new Realm.App({id: this.app_id});
    let mongo = app.currentUser?.mongoClient("mongodb-atlas");
    let collectionRating = mongo?.db("home-maker").collection('rates');
    let userId = localStorage.getItem("userID") as string;
    let useroid = new BSON.ObjectID(userId);
    let expertoid = new BSON.ObjectID(expertId);
    let result = collectionRating?.insertOne({
      expertId: expertId,
      star: star as number,
      review: review,
      userId: useroid
    });
    result?.then(data => {
      if(data){
        let insertedId = data.insertedId;
        let collectionExperts = mongo?.db('home-maker').collection("users");
        let res = collectionExperts?.findOneAndUpdate({_id: expertId}, {$push: {ratings: insertedId}});
        res?.then(data => {
          console.log(data);
          this.snackBar.open("Értékelés hozzáadása sikeres!", "OK", {panelClass: 'success-snackbar'});
        })
      }
    })
  }

  async getRatings(expertId: ObjectId): Promise<Rate[]>{
    let app = new Realm.App({id: this.app_id});
    let user:any;
    let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
    if(app.currentUser){
      user = app.currentUser;
    }else{
      user = app.logIn(creds);
    }
    let mongo = user?.mongoClient("mongodb-atlas");
    let collection = mongo?.db("home-maker").collection('rates');
    return await collection.find({expertId: expertId});
  }


  getCurrentRateValue(ratings:Rate[]){
    let stars:number = 0;
    let rateNumber = 0;
    for(let i = 0; i < ratings.length; i++){
      console.log(ratings[i]);
      stars += ratings[i].star as number;
      rateNumber++;
    }
    console.log(stars, rateNumber);
    return stars / rateNumber;
  }
}
