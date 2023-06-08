import { Component } from '@angular/core';

@Component({
  selector: 'app-add-sheet',
  templateUrl: './add-sheet.component.html',
  styleUrls: ['./add-sheet.component.scss']
})
export class AddSheetComponent {
  public pdfUrl = 'http://localhost:4000/api/v1/upload/sheets/830dcacf-af0a-4cc7-ae28-eafc36390177.pdf';
}
