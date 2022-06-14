import { Component, EventEmitter, Input, OnInit, Output,ViewChild,ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {

  @ViewChild("myElem") MyProp: ElementRef;
  @Output("onclick") onCategoryClick: EventEmitter<any> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  _config = {
    productTitle: 'title',
    cssClass: '',
    data: [] = [],
    categoryTitle:""
  };

  @Input() set config(d){
     this._config = d;
     //setTimeout(()=>{this.MyProp.nativeElement.scrollIntoView({alignToTop:false, behavior: "smooth"});},100);
     
  }

  get config(){
    return this._config;
  }

  onClick(product) {
    this.onCategoryClick.emit(product);
  }

  sanitize(url: string) {
    if(url){
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }
    else{
      return "";
    }
  }
}
