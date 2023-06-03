import { Component, Input, OnInit } from '@angular/core';
import { Sheet } from '../../interfaces/Sheet.interface';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() tTitle: string = '';
  @Input() tHeaders: string[] = [];
  @Input() tDisplays: Sheet[] = [];
  @Input() addButton: boolean = false;
  
  ngOnInit(): void {
    this.tTitle = 'My sheets'
    this.tDisplays = [{
      name: 'Symphony No. 5',
      author: new User(
        'Luwdig',
        'van Beethoveen',
        '',
        '',
      ),
      description: 'Symphony No. 5 is a famous orchestral composition by Ludwig van Beethoven. It is known for its distinctive four-note opening motif.',
      year: 1802,
      license: 'Public Domain',
      genres: [
        'Classical'
      ],
      instruments: [
        'Orchestra'
      ] 
    },
    ];
    throw new Error('Method not implemented.');
  }

}
