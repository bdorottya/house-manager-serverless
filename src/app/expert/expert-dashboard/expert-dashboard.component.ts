import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from 'src/app/navigation/spinner/spinner.component';
import { User } from 'src/app/user/socialUser.model';
import { UserService } from 'src/app/user/user.service';
import { ModifyPricesComponent } from '../modify-prices/modify-prices.component';

@Component({
  selector: 'app-expert-dashboard',
  templateUrl: './expert-dashboard.component.html',
  styleUrls: ['./expert-dashboard.component.scss']
})
export class ExpertDashboardComponent implements OnInit {

  constructor(private userService: UserService, private dialog: MatDialog) { }

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

  uploadAvatar(){}

  updateData(){}

  modifyPrices(){
    this.dialog.open(ModifyPricesComponent);
  }

  getRatings(){}

}
