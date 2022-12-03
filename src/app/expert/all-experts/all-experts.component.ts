import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from 'src/app/navigation/spinner/spinner.component';
import { RateService } from 'src/app/rate/rate.service';
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
  noImg:string = '../../../assets/img/no-img.jpg';

  setQuery:any;

  constructor(private routerSnapshot: ActivatedRoute, private searchService: SearchService, public ratingService: RateService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dialog.open(SpinnerComponent);
    if(this.routerSnapshot.snapshot.queryParams['data']){
      console.log('bejön');
      let fromHomePage = JSON.parse(this.routerSnapshot.snapshot.queryParams['data']);
      console.log(fromHomePage);
      this.setQuery = fromHomePage;
      this.searchService.expertResults(fromHomePage);
      this.searchService.expertDocs.subscribe(data => {
        console.log(data);
        this.experts = data;
        this.dialog.closeAll();
      })
    }else{
      console.log('else');
      this.searchService.getAllExperts();
      this.searchService.expertDocs.subscribe(data => {
        console.log(data);
        this.experts = data;
        this.dialog.closeAll();
      });
    }
  }
}

