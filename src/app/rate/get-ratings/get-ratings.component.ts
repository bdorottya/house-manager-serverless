import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObjectId } from 'mongodb';
import { AuthService } from 'src/app/auth/auth.service';
import { User, UserDAO } from 'src/app/user/socialUser.model';
import { AddRatingComponent } from '../add-rating/add-rating.component';
import { Rate } from '../rate.model';
import { RateService } from '../rate.service';

@Component({
  selector: 'app-get-ratings',
  templateUrl: './get-ratings.component.html',
  styleUrls: ['./get-ratings.component.scss']
})
export class GetRatingsComponent implements OnInit {

  constructor(private dialog: MatDialog, private ratingService: RateService, public authService: AuthService) { }

  @Input() expert!: User;

  ratings: Rate[] = [];
  role!:string;

  ngOnInit(): void {
    this.role = localStorage.getItem("role") as string;
    this.getRatings();
  }

  writeRating(id:ObjectId){
    let dialog = this.dialog.open(AddRatingComponent);
    dialog.componentInstance.expertId=id;
    dialog.afterClosed().subscribe(obs => {
      this.getRatings();
      setTimeout(() => {
        this.ratingService.getCurrentRateValue(this.ratings);
      }, 2000);
    })
  }

  convertStringToInt(ratings:Rate[]){
    for(let i = 0; i < ratings.length; i++){
      console.log(ratings[i].star);
      ratings[i].star = ratings[i].star as number;
      console.log(ratings[i].star);
    }
  }

  async getRatings(){
    await this.ratingService.getRatings(this.expert._id).then((data: Rate[]) => {
      this.convertStringToInt(data);
      this.ratings = data;
      console.log(this.ratings);
    })
  }

}
