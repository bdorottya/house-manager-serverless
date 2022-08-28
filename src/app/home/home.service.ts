import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectId } from 'mongodb';
import { finalize, Observable } from 'rxjs';
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

  imageDownloadUrls:any[]=[];

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
    return images;
  }

  updateHomeWIthImages(homeId:string, images: any[]){
    let userId = localStorage.getItem("userEmail") as string;
    let app = new Realm.App({id: this.app_id});
    let user = app.currentUser;
    let res = this.httpClient.post(this.baseUrlImages, {homeId: homeId, images: images});
    res.subscribe(data => {
      console.log(data);
    })
  }

  async uploadHome(home: HomeDAO){
    const app = new Realm.App({id: this.app_id});
    let date = new Date();
    let mongo = app.currentUser?.mongoClient("mongodb-atlas");
    let collection = mongo?.db("home-maker").collection("homes");
    home.uploadDate = date;
    console.log(home);
    try {
      let res = await collection?.insertOne(home);
      if(res){
        let promise = this.userService.updateUserAfterHomeUpload(res.insertedId);
        promise.then(() => {
          this.snackBar.open("Sikeres feltöltés!", "OK");
          console.log(res?.insertedId, home.images);
          let imageUpload = this.updateHomeWIthImages(res?.insertedId, home.images);
        }).catch(err => {
          console.log(err);
        });
      }
    }
    catch(err){
      console.log(err);
    }
  }

  uploadImages(files: FileUpload[]){

    files.forEach(file => {
      const filepath = file.name;
      const storageRef = this.storage.ref(filepath);
      const upload = this.storage.upload(filepath, file.file);
      upload.snapshotChanges().pipe(finalize(() => {
        storageRef.getDownloadURL().subscribe(url => {
          file.url = url;
          console.log(file.url);
          this.imageDownloadUrls.push(url as string);
        });
      })
      ).subscribe(data => {
        if(data){
        }
      });
    })
  }

  getHomeImages(id: ObjectId){

  }

  viewed(){}
  saved(){}
}
