import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Sheet } from 'src/app/models/sheet.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {
  @Input() cSheet!: Sheet;
  @Input() cUser!: User;

  constructor( private readonly _router: Router ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.cSheet && changes['cSheet']) {
      if (changes['cSheet'].currentValue != changes['cSheet'].previousValue )
      {
        this.cSheet = changes['cSheet'].currentValue;
      }
    }
    if (this.cUser && changes['cUser']) {
      if (changes['cUser'].currentValue != changes['cUser'].previousValue )
      {
        this.cUser = changes['cUser'].currentValue;
      }
    }
  }

  public goToUser(user : User) {
    this._router.navigateByUrl(`es/profile/${user.uid}`);
  }
}
