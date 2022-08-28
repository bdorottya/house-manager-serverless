import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-experts',
  templateUrl: './all-experts.component.html',
  styleUrls: ['./all-experts.component.scss']
})
export class AllExpertsComponent implements OnInit {

  searchType:string="expert";

  constructor() { }

  ngOnInit(): void {
  }

}
