import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HomeDAO } from 'src/app/home/home.model';
import { SocialUser, UserDAO } from '../socialUser.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  getHomeUrl = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/gethome";
  user?: SocialUser;
  avatarImage?:string;
  isLoading:boolean = false;
  uploadedHomes: HomeDAO[] = [];


  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private userService: UserService, private authService: AuthService, private router: Router, private store: AngularFireStorage) { }

  ngOnInit(): void {
    let email = localStorage.getItem("userEmail");
    let user = this.userService.getUser(email as string);
    user.then(data => {
      this.isLoading = false;
      console.log(data);
      this.user = data;
      //this.getAvatar(this.user.avatar);
      this.getUploadedHomes();
    })
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

  getAvatar(url:string){
    let observer = this.store.refFromURL(url).getDownloadURL();
    observer.subscribe(obs => {
      this.avatarImage = obs;
      this.isLoading = false
    })
  }

  getUploadedHomes(){
    console.log("enter");
    if(this.user){
      if(this.user?._uploadedHomes?.length > 0){
        this.user?._uploadedHomes.forEach(home => {
          let queryParams = new HttpParams();
          queryParams = queryParams.append("id", home as string);
          const foundHome = this.httpClient.get<HomeDAO>(this.getHomeUrl, {params: queryParams});
          foundHome.subscribe(home => {
            this.uploadedHomes.push(home);
          });
        })
      }
    }
    console.log(this.uploadedHomes);
  }


}
