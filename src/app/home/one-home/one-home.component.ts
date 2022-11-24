import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'mongodb';
import { HomeDAO } from '../home.model';
import { TypePipe } from 'src/app/pipes/type.pipe';
import { User, UserDAO } from 'src/app/user/socialUser.model';
import { HomeService } from '../home.service';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/search/search.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BSON } from 'realm-web';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from 'src/app/navigation/spinner/spinner.component';
import { AuthService } from 'src/app/auth/auth.service';
import * as Realm from 'realm-web';
import { NotImplementedComponent } from 'src/app/navigation/not-implemented/not-implemented.component';

@Component({
  selector: 'app-one-home',
  templateUrl: './one-home.component.html',
  styleUrls: ['./one-home.component.scss']
})
export class OneHomeComponent implements OnInit {

  bigImage!:string;

  app_id:string = "housemanager-zblhe";
  admin_email:string = "admin@system.com";
  admin_password:string = "admin1234";

  home:HomeDAO = new HomeDAO();
  uploader!:UserDAO;
  images: string[] = [];
  isLoading:boolean = true;

  avatarImage!:string;

  similarHomes: HomeDAO[] = [];

  user:any;
  role!:string;

  constructor(public authService: AuthService, private routerr: Router, private dialog: MatDialog, private router: ActivatedRoute, private homeService: HomeService, private searchService: SearchService, private store: AngularFireStorage) { }

  ngOnInit(): void {
    let app = new Realm.App({id: this.app_id});
    let user:any;
    let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
    this.dialog.open(SpinnerComponent);
    if(app.currentUser){
      user = app.currentUser;
    }else{
      user = app.logIn(creds);
    }
    this.authService.getUser().then(user => {
      this.user = user as User;
      this.user._id = this.user._id as unknown as string;
      this.role = localStorage.getItem("role") as string;
      let id = this.router.snapshot.paramMap.get("id") as string;
      const home = this.homeService.getHome(id);
      home.then(data => {
        data.subscribe(homeDao => {
          this.isLoading = true;
          this.home = homeDao;
          console.log(this.home);
          const uploaderId = this.home.uploader as unknown as string;
          const uploader = this.homeService.getUploader(uploaderId);
          this.searchService.getSimilarHomes(this.home).then((data:any) => {
            console.log(data);
            console.log(this.home._id);
            let newArray:any;
            let index = data?.findIndex(((home: { _id: ObjectId; }) => home._id == this.home._id));
            console.log(index);
            if(index > -1){
              newArray = data?.splice(index, 1);
              this.similarHomes = newArray;
              return;
            }
            this.similarHomes = data;
          })
          uploader.then(d=> {
            d.subscribe(uploaderDao=>{
              this.uploader = uploaderDao;
              if(uploaderDao.avatar){
                this.getAvatar(uploaderDao.avatar);
              }
              console.log(this.uploader);
            })
          }).then(() => {
            this.images = this.homeService.getImages(this.home.images);
            this.isLoading = false;
          }).finally(()=> {
            console.log(this.images);
            console.log(this.home, this.user);
            this.showInBig(this.home.images[0]);
            this.dialog.closeAll();
            console.log(this.user._id === this.home.uploader);
          })
        })
      })
    })

  }

  saveHome(){
    this.homeService.saveHome(this.home._id);
  }

  getAvatar(url:string){
    let observer = this.store.ref(url).getDownloadURL();
    observer.subscribe(obs => {
      this.avatarImage = obs;
      console.log(obs);
      this.isLoading = false
    })
  }

  showInBig(img:string){
    this.bigImage = img;
  }

  navigate(homeId:any){
    this.routerr.navigate(['/allhomes']).then(() => {
      this.routerr.navigate([`/onehome/${homeId}`]);
    })

  }

  openNotImplemented(){
    this.dialog.open(NotImplementedComponent);
  }

}
