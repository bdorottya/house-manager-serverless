import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit {

  constructor() { }

  @Input() query: any;

  ngOnInit(): void {
  }

  

  

}
