import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  phoneForm = new FormGroup({
    phone: new FormControl(''),
    avatar: new FormControl('')
  })

  constructor(private httpClient: HttpClient, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.email = params['email'];
    });
    let res = this.httpClient.get<UserDAO>(this.baseUrl, {params: {email: this.email}});
    res.subscribe(data => {
      console.log(data.email);
    })
  }

  submitForm(){}

}
