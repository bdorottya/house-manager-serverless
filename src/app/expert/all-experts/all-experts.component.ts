import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/search/search.service';
import { User } from 'src/app/user/socialUser.model';

@Component({
  selector: 'app-all-experts',
  templateUrl: './all-experts.component.html',
  styleUrls: ['./all-experts.component.scss']
})
export class AllExpertsComponent implements OnInit {

  searchType:string="expert";
  experts: User[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.getAllExperts();
    this.searchService.expertDocs.subscribe(data => {
      this.experts = data;
    })
  }

}
