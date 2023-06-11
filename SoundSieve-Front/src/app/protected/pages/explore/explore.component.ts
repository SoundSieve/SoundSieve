import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {

  public noBtn: boolean = false;
  public hasImage: boolean = true;
  public resultUrl: string = '/es/search/?q=all';

  constructor( private _router: Router,
    private _userService: UserService ) {

  }
}
