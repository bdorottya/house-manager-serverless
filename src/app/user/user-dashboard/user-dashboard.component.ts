import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserDAO } from '../socialUser.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  user?: UserDAO; 
  

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //@ts-ignore
    Realm.handleAuthRedirect();
    let email = localStorage.getItem("userEmail");
    let user = this.userService.getUser(email as string);
    user.then(data => {
      console.log(data);
      this.user = data;
    })
  }

  logOut(){
    let logout = this.authService.logOut();
    logout.then(value => {
      this.router.navigate(['/']);
    })
  }

  
}
