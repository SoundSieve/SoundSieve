import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() tAddButton: boolean = false;
  @Input() tAddButtonUrl: string;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();

   '/browse/my-music-sheets/add';
  
  ngOnInit(): void {
    
  }

  editRowId(value: string) {
    this.edit.emit(value);
  }
  deleteRowId(value: string) {
    this.delete.emit(value);
  }

}
