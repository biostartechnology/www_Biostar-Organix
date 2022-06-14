import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cartgrid',
  templateUrl: './cartgrid.component.html',
  styleUrls: ['./cartgrid.component.scss']
})
export class CartgridComponent implements OnInit {

  constructor() { }

  @Output("onAction") onAction: EventEmitter<any> = new EventEmitter();

  @Input() config:any;

  ngOnInit(): void {
  }

  onaction(action) {
    this.onAction.emit({ action: action, item: this.config });
  }
}
