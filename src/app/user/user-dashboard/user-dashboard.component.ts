import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SocialUser, UserDAO } from '../socialUser.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  user?: SocialUser;
  avatarImage?:string;
  isLoading:boolean = true;


  constructor(private _snackBar: MatSnackBar, private userService: UserService, private authService: AuthService, private router: Router, private store: AngularFireStorage) { }

  ngOnInit(): void {
    let email = localStorage.getItem("userEmail");
    let user = this.userService.getUser(email as string);
    user.then(data => {
      this.isLoading = true;
      console.log(data);
      this.user = data;
      this.getAvatar(this.user.avatar);
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


}
