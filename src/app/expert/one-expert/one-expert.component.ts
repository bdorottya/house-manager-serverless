import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ObjectId } from 'mongodb';
import { SpinnerComponent } from 'src/app/navigation/spinner/spinner.component';
import { AddRatingComponent } from 'src/app/rate/add-rating/add-rating.component';
import { Rate } from 'src/app/rate/rate.model';
import { RateService } from 'src/app/rate/rate.service';
import { User } from 'src/app/user/socialUser.model';
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

  constructor(private router: ActivatedRoute, private expertService: ExpertService, private dialog: MatDialog, private ratingService: RateService) { }

  ngOnInit(): void {
    this.dialog.open(SpinnerComponent);
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

  writeRating(id:ObjectId){
    let dialog = this.dialog.open(AddRatingComponent);
    dialog.componentInstance.expertId=id;
  }

  async getRatings(){
    await this.ratingService.getRatings(this.expert._id).then(data => {
      this.ratings = data;
      console.log(this.ratings);
    })
  }


}
