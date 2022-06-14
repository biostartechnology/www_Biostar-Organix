import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  t: any;
  currentJustify = 'start';
  currentOrientation = 'horizontal';

  public beforeChange(event:any) {
    if (event.nextId === 'bar') {
      event.preventDefault();
    }
  };
}
