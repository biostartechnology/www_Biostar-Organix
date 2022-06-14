import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comming-soon',
  templateUrl: './comming-soon.component.html',
  styleUrls: ['./comming-soon.component.scss']
})
export class CommingSoonComponent implements OnInit {

  constructor(private router: Router) { }

 goBack() {
  this.router.navigate([".."]);
  }
  ngOnInit(): void {
  }

}
