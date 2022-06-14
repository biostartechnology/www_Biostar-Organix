import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toster',
  templateUrl: './toster.component.html',
  styleUrls: ['./toster.component.scss']
})
export class TosterComponent implements OnInit {

  constructor() { }
  message:string = "";
  ngOnInit(): void {
  }

}
