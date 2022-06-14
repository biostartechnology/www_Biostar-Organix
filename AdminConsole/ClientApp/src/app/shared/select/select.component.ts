import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  constructor() { }
  @Output("change") change: EventEmitter<any> = new EventEmitter();

  @Input() config:any = {
    label:"",
    styleClass:"",
    required:false,
    options:[]
  }
  ngOnInit(): void {
  }

  onChange(val:any){
    this.change.emit(val);
  }
}
