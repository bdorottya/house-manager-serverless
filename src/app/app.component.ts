import { Component, OnInit, Output } from '@angular/core';
import * as Realm from 'realm-web';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'house-manager-serverless';



  constructor(private authService: AuthService){}

  ngOnInit(){

  }

}
