import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  constructor() { }
  
  @Input() config:any = {
    label:"User Name",
    styleClass:"",
    type:"text",
    required:false,
    iconClass:'',
    value:"",
    rows:"",
    cols:""
  }

  ngOnInit(): void {
  }

}
