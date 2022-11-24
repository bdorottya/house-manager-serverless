import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ObjectId } from 'bson';
import * as Realm from 'realm-web';
import { AuthService } from 'src/app/auth/auth.service';
import { ExpertService } from 'src/app/expert/expert.service';
import { HomeDAO } from 'src/app/home/home.model';
import { HomeService } from 'src/app/home/home.service';
import { UploadHomeComponent } from 'src/app/home/upload-home/upload-home.component';
import { SpinnerComponent } from 'src/app/navigation/spinner/spinner.component';
import { SavedExpertsComponent } from '../saved-experts/saved-experts.component';
import {  User, UserDAO } from '../socialUser.model';
import { UpdateDataComponent } from '../update-data/update-data.component';
import { UploadAvatarComponent } from '../upload-avatar/upload-avatar.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, AfterViewInit {

  getHomeUrl = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/gethome";
  user!: User;
  avatarImage?:string;
  isLoading:boolean = false;
  uploadedHomes: HomeDAO[] = [];
  savedHomes: HomeDAO[] = [];
  homeImage!:string;

  savedExperts:User[] = [];

  noImg = "../../../assets/img/no-img.jpg";



  constructor(private expertService: ExpertService, private homeService: HomeService, private httpClient: HttpClient, private _snackBar: MatSnackBar, private userService: UserService, private authService: AuthService, private router: Router, private store: AngularFireStorage, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dialog.open(SpinnerComponent);
    let email = localStorage.getItem("userEmail");
    let user = this.userService.getUser(email as string);
    user.then(data => {
      this.isLoading = false;
      this.user = data;
      this.authService.role = data.role;
      if(data.avatar){
        this.getAvatar(this.user.avatar);
      }
      this.getUploadedHomes();
      this.getSavedExperts(this.user);
      this.homeService.ownHomes.subscribe(data => {
        this.uploadedHomes = data;
        this.uploadedHomes.sort((a,b) => b.price - a.price);
      })
      this.getSavedHomes();
      this.dialog.closeAll();

    })
  }

  ngAfterViewInit(): void {


  }

  getSavedExperts(user:User){
    if(user._savedExperts){
      user._savedExperts.forEach(exp => {
        this.expertService.getExpert(exp as unknown as string).then(expert => {
          this.savedExperts.push(expert);
        })
      })
    }
  }

  logOut(){
    let logout = this.authService.logOut();
    logout.then(() => {
      this._snackBar.open("Sikeres kijelentkezés!", "OK",{
        horizontalPosition: "center",
        verticalPosition: "top"
      });
      this.router.navigate(['/']);
    })
  }

  getHomeImage(url:string){
    let obs = this.store.ref(url).getDownloadURL();
    obs.subscribe(observer => {
      this.homeImage = observer;
    })
  }

  getAvatar(url:string){
    let observer = this.store.ref(url).getDownloadURL();
    observer.subscribe(obs => {
      this.avatarImage = obs;
    })
  }

  updateUserData(){
    this.dialog.open(UpdateDataComponent);
  }

  async getUploadedHomes(){
    if(this.user){
      if(this.user?._uploadedHomes?.length > 0){
        let homes:HomeDAO[] = [];
        this.user?._uploadedHomes.forEach(async home => {
          let queryParams = new HttpParams();
          queryParams = queryParams.append("id", home as unknown as string);
          const foundHome = await this.httpClient.get<HomeDAO>(this.getHomeUrl, {params: queryParams});
          foundHome.subscribe(home => {
            if(home){
              homes.push(home);
              this.homeService.ownHomes.next(homes);
              //this.getHomeImage(home.images[0]);
            }
          });
        })

      }
    }
    console.log(this.uploadedHomes);
  }

  openAvatarDialog(image:any){
    this.dialog.open(UploadAvatarComponent, {data: {email: this.user?.email, image: image}}).afterClosed().subscribe(obs => {
      if(obs){
        if(this.user){
          this.getAvatar(this.user?.avatar);
        }
        this._snackBar.open("Sikeres képfeltöltés!", "OK");
      }
    });
  }

  openHomeUploadDialog(home?:HomeDAO){
    if(!home){
      let dialog = this.dialog.open(UploadHomeComponent);
      dialog.afterClosed().subscribe(obs => {
        setTimeout(() => {
          this.getUploadedHomes();
        }, 3000)

      })
    }else{
      let dialog = this.dialog.open(UploadHomeComponent);
      dialog.componentInstance.editableHome = home;
      dialog.afterClosed().subscribe(obs => {
        setTimeout(() => {
          this.getUploadedHomes();
        }, 3000)
      })
    }
  }

  openExpertsDialog(){
    let dialog = this.dialog.open(SavedExpertsComponent);
    dialog.componentInstance.user = this.user;
  }

  getSavedHomes(){
    if(this.user){
      if(this.user._savedHomes?.length > 0){
        this.user._savedHomes.forEach(home => {
          let queryParams = new HttpParams();
          queryParams = queryParams.append("id", home as unknown as string);
          const foundHome = this.httpClient.get<HomeDAO>(this.getHomeUrl, {params: queryParams});
          foundHome.subscribe(data => {
            if(data){
              this.savedHomes.push(data);
            }
          })
        })
      }
    }
  }


}
