import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from 'src/app/navigation/spinner/spinner.component';
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

  constructor(private userService: UserService, private dialog: MatDialog, private store: AngularFireStorage) { }

  expert:User = new User();
  image = '../../../assets/img/no-img.jpg';


  ngOnInit(): void {
    this.dialog.open(SpinnerComponent);
    let res = this.userService.getUser(localStorage.getItem("userEmail") as string);
    res.then(data => {
      this.expert = data;
      console.log(data);
      this.dialog.closeAll();
    })
  }

  uploadAvatar(){
    let dialog = this.dialog.open(UpdateAvatarComponent);
    dialog.componentInstance.expert = this.expert;
    dialog.componentInstance.image = this.image;
  }

  updateData(){
    let dialog = this.dialog.open(UpdateDataComponent);
    dialog.componentInstance.expert = this.expert;
  }

  modifyPrices(){
    this.dialog.open(ModifyPricesComponent);
  }

  getRatings(){}

}
