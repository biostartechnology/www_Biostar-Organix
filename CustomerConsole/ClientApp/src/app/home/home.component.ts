import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppconstantsService } from '../services/appconstants.service';
import { HelperService } from '../services/helper.service';
import { HttputilityService } from '../services/httputility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private router: Router, private http: HttputilityService, private helper: HelperService) {

  }

  ngOnInit(): void {
  }

  notificationMesg: any = [];

  onCategoryChange(data) {
    this.helper.setCategorySelected(data);
    if (!HelperService.ProductNavigation || window.location.href.indexOf('/product') == -1) {
      this.router.navigate(['/home/product']);
    }
    else {
      HelperService.ProductNavigation(data, HelperService.ProductNavigationArg);
    }
  }
}
