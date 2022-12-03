import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ObjectId } from 'mongodb';
import { AuthService } from 'src/app/auth/auth.service';
import { SpinnerComponent } from 'src/app/navigation/spinner/spinner.component';
import { AddRatingComponent } from 'src/app/rate/add-rating/add-rating.component';
import { Rate } from 'src/app/rate/rate.model';
import { RateService } from 'src/app/rate/rate.service';
import { User } from 'src/app/user/socialUser.model';
import { UserService } from 'src/app/user/user.service';
import { ExpertService } from '../expert.service';

@Component({
  selector: 'app-one-expert',
  templateUrl: './one-expert.component.html',
  styleUrls: ['./one-expert.component.scss']
})
export class OneExpertComponent implements OnInit {


  noImg= '../../../assets/img/no-img.jpg';
  expert!:User;
  currentRate!:number;
  ratings:Rate[]=[];

  role!:string;

  constructor(private snackBar: MatSnackBar, private userService: UserService, public authService: AuthService, private router: ActivatedRoute, private expertService: ExpertService, private dialog: MatDialog, private ratingService: RateService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role") as string;
    this.dialog.open(SpinnerComponent);
    this.getExpert();
  }

  getExpert(){
    let id = this.router.snapshot.paramMap.get("id") as string;
    let expert = this.expertService.getExpert(id);
    expert.then(data => {
      this.expert = data;
      this.getRatings().then(() => {
        this.currentRate = this.ratingService.getCurrentRateValue(this.ratings);
        this.dialog.closeAll();
      });
    })
  }

  saveContact(){
    let exists:boolean;
    this.authService.getUser().then(user => {
      let expert = this.expert;
      if(user._savedExperts){
        user._savedExperts.forEach((exp:ObjectId) => {
          if(exp.equals(expert._id)){
            exists = true;
          }
        })
        if(exists === true){
          this.snackBar.open("Már elmentetted ezt a szakembert", "OK", {panelClass: 'secondary-snackbar'});
        }else{
          this.userService.saveExpert(user, expert).then(data => {
            console.log(data);
            if(data){
              this.snackBar.open("Szakember mentése sikeres!", "OK", {panelClass: 'success-snackbar'});
            }
          });
        }
      }else{
        this.userService.saveExpert(user, expert).then(data => {
          console.log(data);
          if(data){
            this.snackBar.open("Szakember mentése sikeres!", "OK", {panelClass: 'success-snackbar'});
          }
        });
      }

    });

  }

  writeRating(id:ObjectId){
    let dialog = this.dialog.open(AddRatingComponent);
    dialog.componentInstance.expertId=id
    dialog.afterClosed().subscribe(obs => {
      setTimeout(() => {
        this.getExpert()
      }, 1500)
    });
  }

  async getRatings(){
    await this.ratingService.getRatings(this.expert._id).then(data => {
      this.ratings = data;
      console.log(this.ratings);
    })
  }




}
