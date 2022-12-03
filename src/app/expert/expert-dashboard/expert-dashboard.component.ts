import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import * as Realm from 'realm-web';
import { SpinnerComponent } from 'src/app/navigation/spinner/spinner.component';
import { Rate } from 'src/app/rate/rate.model';
import { RateService } from 'src/app/rate/rate.service';
import { User } from 'src/app/user/socialUser.model';
import { UserService } from 'src/app/user/user.service';
import { ModifyPricesComponent } from '../modify-prices/modify-prices.component';
import { UpdateAvatarComponent } from '../update-avatar/update-avatar.component';
import { UpdateDataComponent } from '../update-data/update-data.component';

@Component({
  selector: 'app-expert-dashboard',
  templateUrl: './expert-dashboard.component.html',
  styleUrls: ['./expert-dashboard.component.scss']
})
export class ExpertDashboardComponent implements OnInit {

  constructor(private reateService:RateService, private userService: UserService, private dialog: MatDialog, private store: AngularFireStorage) { }

  expert:User = new User();
  image = '../../../assets/img/no-img.jpg';

  ratings:Rate[] = [];
  userNames:string[] = [];


  ngOnInit(): void {
    this.getExpert();
  }

  getExpert(){
    let email = localStorage.getItem("userEmail") as string;
    this.dialog.open(SpinnerComponent);
    let res = this.userService.getUser(email);
    res.then(data => {
      this.expert = data;
      console.log(data);
      this.getRatings();
      this.dialog.closeAll();
    })
  }

  uploadAvatar(){
    let dialog = this.dialog.open(UpdateAvatarComponent);
    dialog.componentInstance.expert = this.expert;
    dialog.componentInstance.image = this.image;
    dialog.afterClosed().subscribe(obs => {
      if(obs){
        setTimeout(() => {
          this.getExpert();
        }, 1500)
      }
    })
  }

  updateData(){
    let dialog = this.dialog.open(UpdateDataComponent);
    dialog.componentInstance.expert = this.expert;
    dialog.afterClosed().subscribe(obs => {
        setTimeout(() => {
          this.getExpert();
        }, 1500)
    })
  }

  modifyPrices(){
    this.dialog.open(ModifyPricesComponent).afterClosed().subscribe(obs => {
      setTimeout(() => {
        this.getExpert();
      }, 1000)
    });
  }

  getRatings(){
    this.reateService.getRatings(this.expert._id).then(rates=> {
      this.ratings = rates;
      this.ratings.forEach(rating => {
        let user = this.reateService.getUserWhoWroteRating(rating.userId);
        user?.then(user => {
          let userName = user.firstName + ' ' + user.lastName;
          this.userNames.push(userName);
        })
      })
    })
  }

}
