import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {


  role!:string;

  constructor(public authService: AuthService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.authService.getUser().then(data => {
      this.role = data.role;
    });


  }

  logOut(){
    this.authService.logOut();
  }

}
