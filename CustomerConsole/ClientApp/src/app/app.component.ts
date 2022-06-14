import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NLShelp';
  showNav = true;
  constructor() {
    this.showNav = window.location.href.indexOf("invoice") == -1;
  }
  
  ngOnInit(): void {
    console.log(1+1);
    if (window.innerWidth <= 990) {
      document.querySelector('body').classList.add('small_screen');
    }
    else {
      document.querySelector('body').classList.remove('small_screen');
    }
  }
}
