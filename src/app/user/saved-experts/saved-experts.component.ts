import { Component, OnInit } from '@angular/core';
import { ObjectId } from 'bson';
import { ExpertService } from 'src/app/expert/expert.service';
import { RateService } from 'src/app/rate/rate.service';
import { User } from '../socialUser.model';

@Component({
  selector: 'app-saved-experts',
  templateUrl: './saved-experts.component.html',
  styleUrls: ['./saved-experts.component.scss']
})
export class SavedExpertsComponent implements OnInit {

  constructor(private rateService: RateService, private expertService: ExpertService) { }

  user!:User;
  savedExperts:any[] = [];
  writtenRatings:any[] = [];

  ngOnInit(): void {
    this.getSavedExperts(this.user);
    this.getRatings(this.user._id);
  }

  getSavedExperts(user:User){
    if(user._savedExperts.length > 0){
      user._savedExperts.forEach(exp => {
        this.expertService.getExpert(exp as unknown as string).then(expert => {
          this.savedExperts.push(expert);
        })
      })
    }
  }

  getRatings(userId:ObjectId){
    this.rateService.getWroteRatings(userId).then(ratings => {
      this.writtenRatings = ratings;
    })
  }



}
