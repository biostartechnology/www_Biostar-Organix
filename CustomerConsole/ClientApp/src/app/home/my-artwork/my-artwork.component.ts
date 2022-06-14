import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppconstantsService } from '../../services/appconstants.service';
import { HelperService } from '../../services/helper.service';
import { HttputilityService } from '../../services/httputility.service';

@Component({
  selector: 'app-my-artwork',
  templateUrl: './my-artwork.component.html',
  styleUrls: ['./my-artwork.component.scss']
})
export class MyArtworkComponent implements OnInit {
  awaitingArtWork: any = [];
  constructor(private router: Router, private http: HttputilityService, private helper: HelperService) {
    let grid = {
      start: 0,
      limit: 200,
      sortCol: 'ordered_Date',
      sortOrder: 1,
      searchVal: ''
    };
    this.getDatFromServer(grid);
  }

  ngOnInit(): void {
  }

  getDatFromServer(grid: any) {
    this.http.post(AppconstantsService.homeAPIs.orders + "/artwork", grid).then((data: any) => {
      if (data) {
        this.awaitingArtWork = data.rows;
        console.log(this.awaitingArtWork);
      }
    }
      , (error: any) => { })
  }

  cancelClicked() {
    this.router.navigate([".."]);
  }

  imageFileSelected(event: any, item) {
    var file = event.target.files;
    var j = 0;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result) {
        item.ArtWorkImgPath = fileReader.result;
        
        console.log(fileReader.result);
      }
    }
    item.ArtWorkImgName = file[0].name;
    console.log(file[0]);
    fileReader.readAsDataURL(file[0]);
  }

  uploadImage(item, order,index) {
    var json = { JobId: order.JobId, Image: item.ArtWorkImgPath, Index: index, ImageName: item.ArtWorkImgName };
    this.http.put(AppconstantsService.homeAPIs.orders + "/artwork", json).then((data: any) => {
      if (data && data.isSuccess) {
        this.helper.showSuccessTostMessage(data.message,null);
      }
    }, (error: any) => { })
  }

  isImageUploaded(artwork) {
    if (artwork) {
      return !(artwork.indexOf('data:') > -1);
    }
    return true;
  }

  myArtworkList = [
    {
      img: 'assets/myArtwork/1.jpg',
      name: '1',
      size: 'size: 96" x 36" (884.16 KB)',
    },
    {
      img: 'assets/myArtwork/2.jpg',
      name: '2',
      size: 'size: 96" x 36" (884.16 KB)',
    }, {
      img: 'assets/myArtwork/3.jpg',
      name: '3',
      size: 'size: 96" x 36" (884.16 KB)',
    },
    {
      img: 'assets/myArtwork/4.jpg',
      name: '4',
      size: 'size: 96" x 36" (884.16 KB)',
    },
    {
      img: 'assets/myArtwork/5.jpg',
      name: '5',
      size: 'size: 96" x 36" (884.16 KB)',
    },
    {
      img: 'assets/myArtwork/6.jpg',
      name: '6',
      size: 'size: 96" x 36" (884.16 KB)',
    },
    {
      img: '/myArtwork/7.jpg',
      name: '7',
      size: 'size: 96" x 36" (884.16 KB)',
    },
    {
      img: 'assets/myArtwork/8.jpg',
      name: '8',
      size: 'size: 96" x 36" (884.16 KB)',
    },
    {
      img: 'assets/myArtwork/9.jpg',
      name: '9',
      size: 'size: 96" x 36" (884.16 KB)',
    },
    {
      img: 'assets/myArtwork/10.jpg',
      name: '10',
      size: 'size: 96" x 36" (884.16 KB)',
    },
    {
      img: 'assets/myArtwork/11.jpg',
      name: '11',
      size: 'size: 96" x 36" (884.16 KB)',
    },
    {
      img: 'assets/myArtwork/12.jpg',
      name: '12',
      size: 'size: 96" x 36" (884.16 KB)',
    },
    {
      img: 'assets/myArtwork/13.jpg',
      name: '13',
      size: 'size: 96" x 36" (884.16 KB)',
    }, {
      img: 'assets/myArtwork/14.jpg',
      name: '14',
      size: 'size: 96" x 36" (884.16 KB)',
    },
    {
      img: 'assets/myArtwork/15.jpg',
      name: '15',
      size: 'size: 96" x 36" (884.16 KB)',
    },
    {
      img: 'assets/myArtwork/16.jpg',
      name: '16',
      size: 'size: 96" x 36" (884.16 KB)',
    }
  ]
}
