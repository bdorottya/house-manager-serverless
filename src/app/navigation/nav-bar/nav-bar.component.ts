import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  


  constructor(public authService: AuthService) { 
    
  }

  ngOnInit(): void {

  }

  logOut(){
    this.authService.logOut();
  }

}
