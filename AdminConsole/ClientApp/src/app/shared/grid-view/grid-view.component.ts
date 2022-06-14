import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input() config = {
    productTitle: 'title',
    cssClass: '',
    data: [] = []
  }
}
