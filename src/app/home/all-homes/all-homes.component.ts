import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { idToken } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SpinnerComponent } from 'src/app/navigation/spinner/spinner.component';
import { SearchService } from 'src/app/search/search.service';
import { HomeDAO } from '../home.model';
import { HomeService } from '../home.service';
import * as Realm from 'realm-web';
import { HomeArray } from '../home.constants';
import { User } from 'src/app/user/socialUser.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-homes',
  templateUrl: './all-homes.component.html',
  styleUrls: ['./all-homes.component.scss']
})
export class AllHomesComponent implements OnInit, AfterViewInit {

  baseUrl = "https://data.mongodb-api.com/app/housemanager-zblhe/endpoint/getHomes";
  app_id:string = "housemanager-zblhe";
  admin_email:string = "admin@system.com";
  admin_password:string = "admin1234";

  homes: HomeDAO[] = [];


  city2:string[] = HomeArray.city2;
  conditions:string[] = HomeArray.conditions;
  parking:string[] = HomeArray.parking;
  heating:string[] = HomeArray.heating;
  sorting:any[]=[{name: "Ár szerint növekvő", value: 'price-asc'}, {name: "Ár szerint csökkenő", value: 'price-desc'}, {name: "Méret szerint növekvő", value: 'size-asc'}, {name: "Méret szerint csökkenő", value: 'size-desc'}];
  buildingType:string[]= HomeArray.buildingType;

  user!:User;
  isLoggedIn!:boolean;
  setQuery:any;

  viewMode = new FormControl('');
  empty:boolean = false;

  isLoading:boolean = true;

  fromHomePage?:boolean;
  role!:string;

  pageSize:number = 10;
  pageSizeOptions:number[] = [10,20,50];
  length:number = 10;
  pageIndex:number = 0;

  homesToShow: HomeDAO[] = [];

  sortingForm:FormGroup = new FormGroup({
    sortingSelect: new FormControl('')
  })


  constructor(public authService: AuthService, private dialog: MatDialog, private routerSnapshot: ActivatedRoute, private serachService: SearchService, public homeService: HomeService) { }

   ngOnInit(): void {
    this.role = localStorage.getItem("role") as string;
    this.sortingForm.get('sortingSelect')?.setValue('price-asc');
    let app = new Realm.App({id: this.app_id});
    let user:any;
    let creds = Realm.Credentials.emailPassword(this.admin_email, this.admin_password);
    this.dialog.open(SpinnerComponent);
    if(app.currentUser){
      user = app.currentUser;
      this.authService.getUser().then(user => {
        this.user = user;
      })
    }else{
      user = app.logIn(creds);
      this.user = user;
    }
    if(this.routerSnapshot.snapshot.queryParams['data']){
      let fromHomePage = JSON.parse(this.routerSnapshot.snapshot.queryParams['data']);
      console.log(fromHomePage);
      if(fromHomePage){
        this.setQuery = fromHomePage;
        this.serachService.queryHomes(fromHomePage);
        this.serachService.documents.subscribe(obs => {
          this.isLoading = false;
          console.log(obs);
          this.homes = obs;
          this.homesToShow = this.homes.sort((a,b) => a.price - b.price);
          this.homesToShow = this.homesToShow.slice(0,10);
          if(this.homes.length == 0){
            this.empty = true;
            }else{
              this.empty = false;
          }
          this.dialog.closeAll();
        })}
        }else{
          this.serachService.getAllHomes();
          this.serachService.documents.subscribe(observer => {
            console.log(observer);
            this.homes = observer;
            this.homesToShow = this.homes.sort((a,b) => a.price - b.price);
            this.homesToShow = this.homesToShow.slice(0,10);
            if(this.homes.length == 0){
              this.empty = true;
              }else{
                this.empty = false;
              }
            this.dialog.closeAll();
          })
        }
    }

    ngAfterViewInit(){
      this.sortingForm.get('sortingSelect')?.valueChanges.subscribe(data => {
        console.log(data);
        if(data == 'price-asc'){
          this.homesToShow.sort((a,b) => a.price - b.price)
        }
        if(data == 'price-desc'){
          this.homesToShow.sort((a,b) => b.price - a.price)
        }
        if(data == 'size-asc'){
          this.homesToShow.sort((a,b) => a.size - b.size)
        }
        if(data == "size-desc"){
          this.homesToShow.sort((a,b) => b.size - a.size);
        }
      })
    }

    handleChange(e: PageEvent){
      this.pageIndex = e.pageIndex;
      this.pageSize = e.pageSize;
      this.length = e.length;
      this.homesToShow =  this.homes.slice(e.pageIndex*e.pageSize,
        e.pageIndex*e.pageSize + e.pageSize);
    }
}
