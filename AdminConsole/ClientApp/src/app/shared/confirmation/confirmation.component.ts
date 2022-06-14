import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  title: string;
  message: string; 
}

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  notes = {
    fieldId: "Reason",
    label: "Reason",
    fieldValue: "",
    type: "text",
    isValid: true,
    errorMesg: "Please provide reason title",
    required: true,
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

}
