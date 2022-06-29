import { Component, OnInit } from '@angular/core';
import { UserDAO } from '../socialUser.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  user: any; 
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let email = localStorage.getItem("userEmail");
    let user = this.userService.getUser(email as string);
    user.then(data => {
      console.log(data);
      this.user = data;
    })
  }

  
}
