import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user/socialUser.model';
import { ExpertService } from '../expert.service';

@Component({
  selector: 'app-one-expert',
  templateUrl: './one-expert.component.html',
  styleUrls: ['./one-expert.component.scss']
})
export class OneExpertComponent implements OnInit {



  expert!:User;

  constructor(private router: ActivatedRoute, private expertService: ExpertService) { }

  ngOnInit(): void {
    let id = this.router.snapshot.paramMap.get("id") as string;
    let expert = this.expertService.getExpert(id);
    expert.then(data => {
      this.expert = data;
    })
  }

}
