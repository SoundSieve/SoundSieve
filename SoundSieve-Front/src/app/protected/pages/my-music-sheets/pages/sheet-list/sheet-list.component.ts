import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sheet } from 'src/app/models/sheet.model';
import { User } from 'src/app/models/user.model';
import { SheetUpdateData } from 'src/app/shared/interfaces/SheetUpdateData.interface';
import { SheetsService } from 'src/app/shared/services/sheet/sheets.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sheet-list',
  templateUrl: './sheet-list.component.html',
  styleUrls: ['./sheet-list.component.scss']
})
export class SheetListComponent implements OnInit {
  
  public sheets: Sheet[] = [];
  public currentUser: User;
  public isLoading: boolean = true;
  public addButton: boolean = true;
  public url: string = '/browse/my-music-sheets';
  public addUrl: string = this.url + '/add';

  constructor(  private _sheetService : SheetsService,
                private _userService: UserService,
                private _router: Router ) {
                this.currentUser = this._userService.currentUser();
  }

  ngOnInit() : void  {
    this._sheetService.getSheets()
      .subscribe({
        next: (resp) => {
          this.sheets = resp.filter((x: Sheet) => x.author._id === this.currentUser.uid);
          console.log(this.sheets)
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  editSheet(id: string) {
    this._router.navigateByUrl(this.url + '/edit/' + id);
  }

  deleteSheet(id: string) {

    this._sheetService.deleteSheet(id)
      .subscribe({
        next: (response) => {
          Swal.fire('Updated', 'The sheet was deleted!', 'success'); 
          console.log(response);
        },
        error: (error) => {
          Swal.fire('Error', 'Error deleting sheet', 'error');
          console.log(error);
        }
      })
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  
}
