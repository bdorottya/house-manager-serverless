import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ObjectId } from 'mongodb';
import { ExpertService } from 'src/app/expert/expert.service';
import { User } from 'src/app/user/socialUser.model';
import { RateService } from '../rate.service';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.scss']
})
export class AddRatingComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddRatingComponent>, private ratingService: RateService, private expertService: ExpertService) { }

  expertId!:ObjectId;
  expert!:User;

  ratingForm: FormGroup = new FormGroup({
    star: new FormControl(''),
    review: new FormControl(''),
    expert: new FormControl(''),
    user: new FormControl('')
  })

  stars: number[] = [1,2,3,4,5];


  ngOnInit(): void {

    this.expertService.getExpert(this.expertId as unknown as string).then(data => {
      this.expert = data;
      this.ratingForm.get("expert")?.setValue(this.expert.firstName + " " + this.expert.lastName);
      this.ratingForm.get("expert")?.disable();
    })
  }

  sendReview(){
    if(this.ratingForm.valid){
      let star:number = this.ratingForm.get("star")?.value as number;
      let review = this.ratingForm.get("review")?.value;
      this.ratingService.addRating(this.expertId, star, review);
    }
  }

  close(){
    this.dialogRef.close();
  }

}
