import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'mongodb';
import { HomeDAO } from '../home.model';
import { TypePipe } from 'src/app/pipes/type.pipe';
import { UserDAO } from 'src/app/user/socialUser.model';
import { HomeService } from '../home.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-one-home',
  templateUrl: './one-home.component.html',
  styleUrls: ['./one-home.component.scss']
})
export class OneHomeComponent implements OnInit {



  app_id:string = "housemanager-zblhe";

  home:HomeDAO = new HomeDAO();
  uploader:UserDAO = new UserDAO("", "","", new Date());
  images: string[] = [];

  constructor(private router: ActivatedRoute, private homeService: HomeService) { }

  ngOnInit(): void {
    let app = new Realm.App({id: this.app_id});
    let user = app.currentUser;
    let id = this.router.snapshot.paramMap.get("id") as string;
    const home = this.homeService.getHome(id);
    home.then(data => {
      data.subscribe(homeDao => {
        this.home = homeDao;
        console.log(this.home);
        const uploaderId = this.home.uploader as unknown as string;
        const uploader = this.homeService.getUploader(uploaderId);
        uploader.then(d=> {
          d.subscribe(uploaderDao=>{
            this.uploader = uploaderDao;
          })
        }).then( () => {
          this.images = this.homeService.getImages(this.home.images);
        }).finally(()=> {
          console.log(this.images);
          console.log(this.home);
        })
      })
    })
  }

}
