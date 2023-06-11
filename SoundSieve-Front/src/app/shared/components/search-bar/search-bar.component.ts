import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Input() placeholder: string = 'Discover new music sheets...';

  constructor( private _router: Router ) { }

  search( query: string ) {
    if( query.length === 0) {
      return;
    }
    this._router.navigateByUrl(`es/search/${query}`);
  }
}
