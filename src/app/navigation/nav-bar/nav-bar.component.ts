import { ChangeDetectionStrategy, ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/user/socialUser.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {


  role!:string;
  isLoggedIn:boolean = false;

  constructor(public authService: AuthService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.authService.user$.subscribe(value =>{
      console.log("new value ", value);
      if(value) this.isLoggedIn = true;
    })
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.getUser().then(user =>{
      this.role = user.role;
    })
  }

  logOut(){
    this.authService.logOut();
    this.isLoggedIn = false;
  }

}
