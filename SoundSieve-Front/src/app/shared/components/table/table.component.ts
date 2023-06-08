import { Component, Input, OnInit } from '@angular/core';
import { Sheet } from 'src/app/models/sheet.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() tTitle: string;
  @Input() tHeaders: string[];
  @Input() tDisplays: Sheet[];
  @Input() addButton: boolean = false;
  
  ngOnInit(): void {
    
  }

}
