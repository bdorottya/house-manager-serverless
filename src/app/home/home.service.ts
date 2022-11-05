import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectId } from 'mongodb';
import { BSON } from 'realm-web';
import { finalize, first, map, Observable, Subject } from 'rxjs';
import { FileUpload } from '../data-models/file-upload.model';
import { UserDAO } from '../user/socialUser.model';
import { UserService } from '../user/user.service';
import { HomeDAO } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  app_id:string = "housemanager-zblhe";
  admin_email:string = "admin@system.com";
  admin_password:string = "admin1234";
  baseUrlHome = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/gethome";
  baseUrlUploader = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/getUploader";
  baseUrlImages = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/updateHomeImages";
  saveHomeUrl = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/saveHome";

  imageDownloadUrls!:string;

  ownHomes: Subject<HomeDAO[]> = new Subject();
  savedHomes: Subject<HomeDAO[]> = new Subject();

  file!: FileUpload;

  urlsLoaded!:boolean;

  constructor(private userService: UserService, private snackBar: MatSnackBar, private storage: AngularFireStorage, private httpClient: HttpClient) { }

  async getHome(id: string): Promise<Observable<HomeDAO>>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    console.log(queryParams);
    return await this.httpClient.get<HomeDAO>(this.baseUrlHome, {params: queryParams});
  }

  async getUploader(id: string): Promise<Observable<UserDAO>>{
    let params = new HttpParams();
    params = params.append("id", id);
    console.log(params);
    return await this.httpClient.get<UserDAO>(this.baseUrlUploader, {params: params});
  }

   getImages(imageRefs: string[]){
    let images: string[] = [];
    imageRefs.forEach(ref => {
      let obs = this.storage.refFromURL(ref).getDownloadURL();
      obs.subscribe(image => {
        images.push(image);
      })
    })
    console.log(images);
    return images;
  }

  updateHomeWIthImages(homeId:string, images: string[]){
    let app = new Realm.App({id: this.app_id});
    let user = app.currentUser;
    let observers;
    console.log(images);
    images.forEach(image => {
      console.log("forban");
      console.log(image);
      let upload = this.httpClient.post(this.baseUrlImages, {homeId: homeId, images: image});
      upload.subscribe(obs => {
        console.log(obs);
        observers.push(obs);
      })
    })
    return observers;
  }

  async updateHome(homeId: ObjectId, home: HomeDAO){
    let app = new Realm.App({id: this.app_id});
    let user = app.currentUser;
    let mongo = app.currentUser?.mongoClient("mongodb-atlas");
    let collection = mongo?.db("home-maker").collection("homes");
    try {
      console.log(homeId, home);
      let newId = new BSON.ObjectID(homeId)
      return await collection?.updateOne({_id: newId}, {$set: home});
    }catch(error){
      console.log(error);
      return error;
    }
  }

  async deleteHome(homeId:ObjectId){
    let app = new Realm.App({id: this.app_id});
    let user = app.currentUser;
    let mongo = app.currentUser?.mongoClient("mongodb-atlas");
    let collection = mongo?.db("home-maker").collection("homes");
    try {
      let newId = new BSON.ObjectID(homeId);
      return await collection?.deleteOne({_id: newId});
    }catch(err) {
      console.log(err);
      return err;
    }
  }

  async uploadHome(home: HomeDAO, files: FileUpload[]){
    const app = new Realm.App({id: this.app_id});
    let date = new Date();
    let mongo = app.currentUser?.mongoClient("mongodb-atlas");
    let collection = mongo?.db("home-maker").collection("homes");
    home.uploadDate = date;
    try {
      console.log(home);
      let res = await collection?.insertOne(home);
      if(res){
        let promise = this.userService.updateUserAfterHomeUpload(res.insertedId);
        promise.then(() => {
          files.forEach(file => {
            this.uploadImages(res?.insertedId, file);
        })
      }).then(() => {
        this.snackBar.open("Sikeres feltöltés", "OK", {panelClass: 'success-snackbar'});
      })
    }}
    catch(err){
      console.log(err);
    }
  }

  uploadImages(homeId: ObjectId, file: FileUpload){
    console.log(file);
    const filepath = file.name;
    const storageRef = this.storage.ref(filepath);
    const upload = this.storage.upload(filepath, file.file);
      upload.snapshotChanges().pipe(map(obs => {
        console.log("inside map: ", obs);
        storageRef.getDownloadURL().subscribe(url => {
          console.log("getdownloadban");
          file.url = url;
          console.log(file.url);
          let updateHome = this.httpClient.post(this.baseUrlImages, {homeId: homeId, image: url});
          updateHome.subscribe(data => {
            console.log("updateHome subban");
            console.log(data);
          })
        })
        }
      )).subscribe(obs => {
        console.log("snapshot subscribe");
      });



  }

  saveHome(home?: ObjectId){
    let app = new Realm.App({id: this.app_id});
    let user = app.currentUser;
    console.log("save me: ", home as unknown as string);
    console.log(user);
    let data = {
      userId: user?.id,
      homeId: home
    }
    let alreadySaved = user?.callFunction("alreadySavedHome", home as unknown as string, user?.id as unknown as string);
    alreadySaved?.then(res => {
      console.log(res);
      let ress:any = res;
      if(ress.length>0){
        console.log(res);
        this.snackBar.open("Már elmentetted ezt az ingatlant.", "OK", {panelClass: 'error-snackbar'});
      }else{
        let results = this.httpClient.post<any>(this.saveHomeUrl, data);
        results.subscribe(obs => {
          console.log(obs);
          if(obs != null){
            this.snackBar.open("Sikeres mentés!", "OK", {panelClass: 'secondary-snackbar'});
          }
        })
      }
    })
  }

}
