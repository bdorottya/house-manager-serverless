import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDAO } from '../socialUser.model';

@Component({
  selector: 'app-after-first-login',
  templateUrl: './after-first-login.component.html',
  styleUrls: ['./after-first-login.component.scss']
})
export class AfterFirstLoginComponent implements OnInit {

  isLinear = false;
  baseUrl = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/firstlogin"
  email:string = "";
  firstName:string = "";
  lastName:string = "";

  constructor(private httpClient: HttpClient, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.email = params['email'];
    });

    let params = JSON.stringify({email: this.email});
    let res = this.httpClient.post(this.baseUrl, {body: {params}});
    res.subscribe(data => {
      console.log("data: ", data);
    })
  }

}
