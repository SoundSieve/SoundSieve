import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/shared/services/search/search.service';

import { Sheet } from 'src/app/models/sheet.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {

  public searchPlaceholder: string = 'Search...';
  public resultSheets: Sheet[] = [];
  public resultUsers: User[] = [];

  public offset: number = 0;
  public limit: number = 10;

  constructor( 
    private _activatedRoute: ActivatedRoute,
    private _searchService: SearchService,
    ) { }
  
  ngOnInit(): void {
    this._activatedRoute.params
      .subscribe( ({query}) => {
          this.globalSearch(query);
      });
  }

  private globalSearch( query: string ) {
    this.resultUsers = [];
    this.resultSheets = [];

    this._searchService.globalSearch( query )
      .subscribe((resp: any) => {
        this.resultUsers = resp.users;
        this.resultSheets = resp.sheets;
      })
  }
}
