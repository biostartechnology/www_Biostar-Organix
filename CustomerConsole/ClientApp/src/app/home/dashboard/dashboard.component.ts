import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  categoryId = "";
  categorySelected = false;
  slideInfo1 = [{
    img: "/assets/dashboardImg/01.webp",
    title: "Channel Letter",
    link: "",
    id: "d207802c-d55b-44fa-af81-84c4438969da"
  },
    {
      img: "/assets/dashboardImg/02.webp",
      title: "Banner1",
      link: "",
      id: "d207802c-d55b-44fa-af81-84c4438969da"
    },
    {
      img: "/assets/dashboardImg/03.webp",
      title: "Banner2",
      link: "",
      id: "d207802c-d55b-44fa-af81-84c4438969da"
    },
    {
      img: "/assets/dashboardImg/04.webp",
      title: "Flag",
      link: "",
      id: "3df85492-46a3-470a-b87f-00df677cf53f"
    }];

  slideInfo2 = [{
    img: "/assets/dashboardImg/01.pnwebpg",
    title: "Channel Letter",
    link: "",
    id: "d207802c-d55b-44fa-af81-84c4438969da"
  },
  {
    img: "/assets/dashboardImg/02.webp",
    title: "Banner1",
    link: "",
    id: "d207802c-d55b-44fa-af81-84c4438969da"
  },
  {
    img: "/assets/dashboardImg/03.webp",
    title: "Banner2",
    link: "",
    id: "d207802c-d55b-44fa-af81-84c4438969da"
  },
  {
    img: "/assets/dashboardImg/04.webp",
    title: "Flag",
    link: "",
    id: "3df85492-46a3-470a-b87f-00df677cf53f"
    }];

  slideInfo3 = [
    {
      info: [
        {img:"/assets/dashboardImg/010.png", title: "Indoor OutDoor",}, 
        {img:"/assets/dashboardImg/011.png" , title: "Indoor OutDoor",}, 
        {img:"/assets/dashboardImg/012.png", title: "Indoor OutDoor",}
      ],
    
    },
    {
      info: [
        {img:"/assets/dashboardImg/013.jpg", title: "Indoor OutDoor",}, 
        {img:"/assets/dashboardImg/014.jpg", title: "Indoor OutDoor",}, 
        {img:"/assets/dashboardImg/015.jpg", title: "Indoor OutDoor",}
      ],
    },
    {
      info: [
        {img:"/assets/dashboardImg/016.jpg", title: "Indoor OutDoor",}, 
        {img:"/assets/dashboardImg/017.png", title: "Indoor OutDoor",}, 
        {img:"/assets/dashboardImg/018.png", title: "Indoor OutDoor",}],
    },
   
    
  ];
  
  loggedIn = false;

  onCatClick(d) {
    this.categorySelected = true;
    this.categoryId = d.id;
  }

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  constructor(private auth: AuthService) {
    this.auth.validateSession().then((data) => { this.loggedIn = true }, (e) => { })
  }

  ngOnInit(): void {
  }

}
