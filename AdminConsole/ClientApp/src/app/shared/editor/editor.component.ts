import { Component, Input, OnInit } from '@angular/core';

//import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Input() config: any= {
    fieldValue:''
  }
  name = 'Angular';
  content = '<p>Hi</p>';
  formControl:any;
  blured = false
  focused = false

  created(event) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
  }

  //changedEditor(event: EditorChangeContent | EditorChangeSelection) {
  //  // tslint:disable-next-line:no-console
  //  console.log('editor-change', event)
  //}

  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false
    this.blured = true
  }

  constructor() { }

  ngOnInit(): void {
  }

}
