import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor() { }

  @Input() config:any = {
    label:"User Name",
    styleClass:"",
    type:"text",
    required:false,
    iconClass:'verified_user',
    value:""
  }

  ngOnInit(): void {
  }

}
