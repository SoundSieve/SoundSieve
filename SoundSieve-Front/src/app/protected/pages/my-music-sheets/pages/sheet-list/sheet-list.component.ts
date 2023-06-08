import { Component, OnInit } from '@angular/core';
import { Sheet } from 'src/app/models/sheet.model';
import { User } from 'src/app/models/user.model';
import { SheetsService } from 'src/app/shared/services/sheet/sheets.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-sheet-list',
  templateUrl: './sheet-list.component.html',
  styleUrls: ['./sheet-list.component.scss']
})
export class SheetListComponent implements OnInit {
  
  public sheets: Sheet[] = [];
  public currentUser: User;
  public isLoading: boolean = true;

  constructor(  private _sheetService : SheetsService,
                private _userService: UserService, ) {
                this.currentUser = this._userService.currentUser();
  }

  ngOnInit() : void  {
    this._sheetService.getSheets()
      .subscribe({
        next: (resp) => {
          this.sheets = resp.filter((x: Sheet) => x.author._id === this.currentUser.uid);
        }
      })
  }
  
}
